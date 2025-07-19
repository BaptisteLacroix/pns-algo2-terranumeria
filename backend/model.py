import json
import logging
import queue as _queue
import sys
import time
from threading import Thread
import platform

import torch
import torch.nn.functional as F
from huggingface_hub import login
from loadtime import LoadTime
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig, TextIteratorStreamer, LogitsProcessor
from transformers.utils import logging as hf_logging

from conversation_manager import ConversationManager
from profiles import get_profile_content

HF_TOKEN = sys.argv[1]
CACHE_DIR = sys.argv[2] if len(sys.argv) > 2 else None

logger = logging.getLogger("FlaskAppLogger")

# Enable Hugging Face Transformers logging
hf_logging.set_verbosity_info()
hf_logging.enable_default_handler()
hf_logging.enable_explicit_format()

# Optional: direct HF logs to your existing logger
transformers_logger = hf_logging.get_logger()
transformers_logger.setLevel(logging.INFO)


# Classe pour capturer les probabilités des tokens pendant la génération
class ProbabilityLogitsProcessor(LogitsProcessor):
    def __init__(self, tokenizer):
        self.tokenizer = tokenizer
        self.last_token_probabilities = []

    def __call__(self, input_ids, scores):
        # Calcul des probabilités pour le token actuel (scores représente les logits pour ce token)
        # Applique softmax pour convertir les logits en probabilités
        probs = F.softmax(scores, dim=-1)

        # Récupération des 5 tokens les plus probables
        top_probs, top_indices = torch.topk(probs, 5)

        # Conversion en liste pour être facilement sérialisable en JSON
        probs_list = []
        for i in range(min(5, len(top_indices[0]))):
            token_id = top_indices[0][i].item()
            prob = top_probs[0][i].item()
            token_text = self.tokenizer.decode([token_id])
            probs_list.append({"token": token_text, "probability": round(prob, 4)})

        # Stockage des probabilités pour ce token spécifique
        self.last_token_probabilities = probs_list

        # Important: ne pas modifier les scores pour ne pas affecter la génération
        return scores


class Model:
    @property
    def current_conversation_id(self):
        return self._current_conversation_id

    @current_conversation_id.setter
    def current_conversation_id(self, conversation_id):
        self._current_conversation_id = conversation_id

    def __init__(self, model_category, model_id, profile_id="default", available_models=None):
        if available_models is None:
            self.load_default_config()
        else:
            self.available_models = available_models
        # Check if GPU is available and has enough memory for model loading
        try:
            if torch.cuda.is_available():
                total_mem = torch.cuda.get_device_properties(0).total_memory
                total_mem_gb = total_mem / (1024**3)
                if total_mem_gb > 4:  # Require at least 4GB of VRAM
                    self.device = "cuda"
                    logger.info(f"📌 Using device: {self.device} with {total_mem_gb:.1f}GB VRAM")
                else:
                    self.device = "cpu"
                    logger.info(f"📌 Using device: {self.device} (GPU available but insufficient VRAM: {total_mem_gb:.1f}GB)")
            else:
                self.device = "cpu"
                logger.info(f"📌 Using device: {self.device} (No GPU available)")
        except Exception as e:
            self.device = "cpu"
            logger.info(f"📌 Using device: {self.device} (Error checking GPU: {str(e)})")
            
        self.model_path = self.check_and_get_model_path(model_category, model_id)
        self.tokenizer = None
        self.login_hugging_face()
        self.ai_model, exception = self.load_model()
        if self.tokenizer is not None and self.ai_model is not None:
            logger.info(f"✅ Model {self.model_path} loaded successfully")
        else:
            logger.error(f"❌ Error loading model or tokenizer: {str(exception)}")
            # If we have a specific error about bitsandbytes, provide more helpful information
            if exception and ("n'est pas une application Win32 valide" in str(exception) or 
                             "[WinError 193]" in str(exception)):
                logger.error("💡 This appears to be an issue with bitsandbytes on Windows. "
                             "The application will attempt to use float16 precision instead.")
            elif exception and "Cannot access accelerator device" in str(exception):
                logger.error("💡 Cannot access GPU accelerator. The model will run in CPU mode.")

        # Chargement du profil sélectionné
        self.profile_id = profile_id
        self.profile_name = None
        self.chat_history = None
        self.load_profile(profile_id)

        self.conversation_manager = ConversationManager()
        self._current_conversation_id = self.conversation_manager.generate_conversation_id()

        # Initialiser le processeur de logits pour les probabilités
        self.prob_processor = None

    def load_default_config(self):
        # The models dictionary will store categories of models, each with a list of models.
        with open('config.json', 'r') as f:
            self.available_models = json.load(f)

    def update_available_models(self, model_category, model_id, model_url):
        """
        Met à jour la liste des modèles disponibles
        """
        if model_category not in self.available_models:
            self.available_models[model_category] = {}
        self.available_models[model_category][model_id] = model_url
        # Sauvegarde de la configuration mise à jour dans le fichier config.json
        with open('config.json', 'w') as f:
            json.dump(self.available_models, f, indent=4)
        logger.info(f"Available models updated: {self.available_models}")
        return self.available_models

    def change_model(self, model_category, model_id):
        """
        Change le modèle de l'IA et réinitialise l'historique
        """
        print(f"Changing model to {model_category}/{model_id}")
        self.model_path = self.check_and_get_model_path(model_category, model_id)
        self.ai_model, exception = self.load_model()
        return self.model_path, exception

    @staticmethod
    def login_hugging_face():
        try:
            login(token=HF_TOKEN)
            logger.info("✅ Successfully logged in to Hugging Face")
        except Exception as e:
            logger.info(f"⚠️ Error logging in to Hugging Face: {e}")

    def check_and_get_model_path(self, model_category, model_id):
        if model_category in self.available_models:
            for key, value in self.available_models.get(model_category).items():
                if key == model_id:
                    return model_category + "/" + model_id

    def load_model(self, max_loading_time=600):  # 10 minutes maximum loading time
        # Load model and tokenizer (loading them globally for reuse)
        try:
            is_windows = platform.system() == "Windows"
            
            if self.device == "cuda":
                device_map = {"": 0}  # Map all modules to GPU 0 by default
            else:
                device_map = "auto"  # Let the library handle device mapping on CPU
            
            # Vérifier si c'est un petit modèle (< 3B de paramètres)
            is_small_model = any(small_model in self.model_path.lower() 
                                for small_model in ["croissantllm-1.3b", "tinyllama-1.1b", "gemma-2b"])
            
            # Function to load model with timeout
            def load_with_timeout(load_fn, timeout):
                result = [None]
                exception = [None]
                
                def target():
                    try:
                        result[0] = load_fn()
                    except Exception as e:
                        exception[0] = e
                
                thread = Thread(target=target)
                thread.daemon = True
                thread.start()
                thread.join(timeout)
                
                if thread.is_alive():
                    logger.error(f"⚠️ Model loading timed out after {timeout} seconds.")
                    return None, TimeoutError(f"Model loading timed out after {timeout} seconds")
                
                if exception[0]:
                    return None, exception[0]
                
                return result[0], None
            
            # Pas de fallback vers un modèle plus petit comme demandé
            
            if is_small_model or is_windows:
                # Windows or small model: always use float16 without quantization
                logger.info(f"🔄 Loading model {self.model_path} with float16 precision (no quantization)...")
                load_fn = lambda: AutoModelForCausalLM.from_pretrained(
                    self.model_path,
                    torch_dtype=torch.float16,
                    device_map=device_map,
                    cache_dir=CACHE_DIR,
                    low_cpu_mem_usage=True
                )
                model, err = load_with_timeout(load_fn, max_loading_time)
                
                # Si le chargement échoue, on génère simplement une erreur
                if model is None:
                    logger.error(f"❌ Failed to load model {self.model_path}: {str(err)}")
                    # Pas de fallback vers un modèle plus petit
            else:
                # Non-Windows with larger model: try quantization first
                try:
                    # Configuration pour les modèles plus grands (7B+) avec quantification 4-bit
                    quantization_config = BitsAndBytesConfig(
                        load_in_4bit=True,
                        bnb_4bit_compute_dtype=torch.float16,
                        bnb_4bit_use_double_quant=False,
                        bnb_4bit_quant_type="nf4",
                        llm_int8_enable_fp32_cpu_offload=True
                    )
                    logger.info(f"🔄 Loading larger model {self.model_path} with 4-bit quantization...")
                    load_fn = lambda: AutoModelForCausalLM.from_pretrained(
                        self.model_path,
                        torch_dtype=torch.float16,
                        device_map=device_map,
                        quantization_config=quantization_config,
                        cache_dir=CACHE_DIR,
                        offload_folder="offload",
                        offload_state_dict=True,
                        low_cpu_mem_usage=True
                    )
                    model, err = load_with_timeout(load_fn, max_loading_time)
                    
                    if err and ("Cannot access accelerator device" in str(err) or 
                               "No accelerator available" in str(err)):
                        # Fallback to non-quantized on CPU
                        logger.warning(f"⚠️ Accelerator error: {str(err)}. Falling back to float16 without quantization.")
                        load_fn = lambda: AutoModelForCausalLM.from_pretrained(
                            self.model_path,
                            torch_dtype=torch.float16,
                            device_map="auto",
                            cache_dir=CACHE_DIR,
                            low_cpu_mem_usage=True
                        )
                        model, err = load_with_timeout(load_fn, max_loading_time)
                        
                        # Si le chargement échoue, on génère simplement une erreur
                        if model is None:
                            logger.error(f"❌ Failed to load model {self.model_path}: {str(err)}")
                            # Pas de fallback vers un modèle plus petit
                except Exception as e:
                    logger.warning(f"⚠️ Error with quantization: {str(e)}. Falling back to float16 without quantization.")
                    load_fn = lambda: AutoModelForCausalLM.from_pretrained(
                        self.model_path,
                        torch_dtype=torch.float16,
                        device_map="auto",
                        cache_dir=CACHE_DIR,
                        low_cpu_mem_usage=True
                    )
                    model, err = load_with_timeout(load_fn, max_loading_time)
                    
                    # Si le chargement échoue, on génère simplement une erreur
                    if model is None:
                        logger.error(f"❌ Failed to load model {self.model_path}: {str(err)}")
                        # Pas de fallback vers un modèle plus petit
            
            # If we still couldn't load the model
            if model is None:
                logger.error(f"❌ Failed to load model after all attempts: {str(err)}")
                return None, err
                
            logger.info("✅ Model loaded successfully")
            
            # Then load the tokenizer
            logger.info(f"🔄 Loading tokenizer for {self.model_path}...")
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_path, cache_dir=CACHE_DIR)
            
            # Configurer le pad_token en fonction du modèle
            if self.tokenizer.pad_token is None:
                self.tokenizer.pad_token = self.tokenizer.eos_token
                
            logger.info(f"✅ Tokenizer {self.model_path} loaded successfully")
            return model, None
        except Exception as e:
            logger.error(f"❌ Error loading model or tokenizer: {e}")
            return None, e

    def generate_response_stream(self, prompt, temperature=0.7, top_p=0.1):
        """
        Generate streaming response from the language model with token probabilities
        """

        if self.ai_model is None or self.tokenizer is None:
            error_message = "Le modèle n'a pas été chargé correctement. Veuillez vérifier les logs pour plus d'informations."
            logger.error(error_message)
            json_error = json.dumps({"error": error_message, "token": error_message, "probabilities": []})
            yield f"data: {json_error}\n\n"
            return

        try:
            # Format the prompt
            formatted_prompt = self.format_prompt(prompt)

            # Prepare input
            tokenized_inputs = self.tokenizer(formatted_prompt, return_tensors="pt").to(self.device)
            input_ids = tokenized_inputs["input_ids"]
            attention_mask = tokenized_inputs["attention_mask"]

            # Create probability processor with fresh state
            self.prob_processor = ProbabilityLogitsProcessor(self.tokenizer)
            
            # Ajuster les paramètres de génération selon le modèle
            model_path = self.model_path.lower() if self.model_path else ""
            
            # Paramètres spécifiques aux petits modèles
            if any(small_model in model_path for small_model in ["croissantllm-1.3b", "tinyllama-1.1b"]):
                max_new_tokens = 256  # Réduire pour les petits modèles
                # Augmenter la température pour les petits modèles pour favoriser la diversité
                if temperature < 0.5:
                    temperature = 0.7
            else:
                max_new_tokens = 512  # Valeur standard pour les modèles plus grands

            # Setup streamer
            streamer = TextIteratorStreamer(self.tokenizer, skip_prompt=True, timeout=900.0)

            # Configure generation with logits processor for probabilities
            generation_kwargs = {
                "inputs": input_ids,
                "attention_mask": attention_mask,
                "max_new_tokens": max_new_tokens,
                "temperature": temperature,
                "top_p": top_p,
                "do_sample": True,
                "streamer": streamer,
                "logits_processor": [self.prob_processor],
                "output_scores": True,
                "return_dict_in_generate": True
            }
            
            # Ajouter des paramètres spécifiques pour certains modèles
            if "gemma" in model_path:
                # Gemma peut bénéficier d'un repetition_penalty
                generation_kwargs["repetition_penalty"] = 1.1
            
            # Configurer les tokens d'arrêt spécifiques selon le modèle
            if "croissantllm" in model_path:
                # Pour CroissantLLM, définir <|im_end|> comme token d'arrêt
                eos_token_id = self.tokenizer.convert_tokens_to_ids("<|im_end|>")
                generation_kwargs["eos_token_id"] = eos_token_id

            # Start generation in a separate thread
            generation_thread = Thread(target=self.ai_model.generate, kwargs=generation_kwargs)
            generation_thread.daemon = True
            generation_thread.start()

            # Wait for generation to actually start before yielding
            time.sleep(0.5)

            response_text = ""
            try:
                for chunk in streamer:
                    response_text += chunk

                    current_probabilities = self.prob_processor.last_token_probabilities

                    # Token with the probability the highest
                    highest_prob_token = max(current_probabilities,
                                             key=lambda x: x["probability"]) if current_probabilities else None
                    # Check if the chunk contains a space and append it to the token
                    token_text = highest_prob_token["token"] if highest_prob_token else ""
                    # if the last character of chunk is a space
                    if chunk and chunk[-1] == " ":
                        token_text = " " + token_text
                    json_chunk = json.dumps({
                        "token": token_text,
                        "probabilities": current_probabilities
                    })
                    yield f"data: {json_chunk}\n\n"

            except _queue.Empty:
                logger.warning("Streamer queue empty, generation may have stalled")
                if response_text:
                    error_msg = json.dumps(
                        {"token": "\n\n[Generation timed out, but partial response retrieved]", "probabilities": []})
                    yield f"data: {error_msg}\n\n"
                else:
                    error_msg = json.dumps(
                        {"token": "Désolé, la génération de réponse a pris trop de temps. Veuillez réessayer.",
                         "probabilities": []})
                    yield f"data: {error_msg}\n\n"

            if response_text:
                self.chat_history.append({"role": "assistant", "content": response_text})
                # Sauvegarde de la conversation après chaque réponse
                self.conversation_manager.save_conversation(self.current_conversation_id, self.chat_history)

        except Exception as e:
            import traceback
            error_traceback = traceback.format_exc()
            logger.error(f"Model generation error: {str(e)}\n{error_traceback}")
            error_msg = json.dumps(
                {"error": str(e), "token": f"Error generating response: {str(e)}", "probabilities": []})
            yield f"data: {error_msg}\n\n"

    def format_prompt(self, prompt):
        """
        Construit le prompt en intégrant l'historique sous la forme adaptée au modèle utilisé.
        Différents formats selon le modèle:
        - Format Mistral/général: <|user|>\nQuestion</s>\n<|assistant|>\nRéponse</s>
        - Format TinyLlama: <|system|>\nInstruction</s>\n<|user|>\nQuestion</s>\n<|assistant|>\n
        - Format Gemma: <start_of_turn>user\nQuestion<end_of_turn>\n<start_of_turn>model\n
        - Format CroissantLLM: <|im_start|>user\nQuestion<|im_end|>\n<|im_start|>assistant\n
        """
        self.chat_history.append({"role": "user", "content": prompt})

        # Identifier le modèle pour choisir le format approprié
        model_path = self.model_path.lower() if self.model_path else ""
        
        # Format pour TinyLlama
        if "tinyllama" in model_path:
            formatted_prompt = ""
            for entry in self.chat_history:
                role = entry["role"]
                role_tag = f"<|{role}|>"
                formatted_prompt += f"{role_tag}\n{entry['content']}</s>\n"
            formatted_prompt += "<|assistant|>\n"
            return formatted_prompt
            
        # Format pour Gemma
        elif "gemma" in model_path:
            formatted_prompt = ""
            for entry in self.chat_history:
                role = entry["role"]
                if role == "system":
                    # Pour Gemma, les instructions système sont généralement incluses dans le premier tour utilisateur
                    continue
                elif role == "user":
                    formatted_prompt += f"<start_of_turn>user\n{entry['content']}<end_of_turn>\n"
                elif role == "assistant":
                    formatted_prompt += f"<start_of_turn>model\n{entry['content']}<end_of_turn>\n"
            formatted_prompt += "<start_of_turn>model\n"
            return formatted_prompt
            
        # Format pour CroissantLLM
        elif "croissantllm" in model_path:
            formatted_prompt = ""
            for entry in self.chat_history:
                role = entry["role"]
                formatted_prompt += f"<|im_start|>{role}\n{entry['content']}<|im_end|>\n"
            formatted_prompt += "<|im_start|>assistant\n"
            return formatted_prompt
            
        # Format par défaut (Mistral et autres)
        else:
            formatted_prompt = ""
            for entry in self.chat_history:
                role_tag = "<|" + entry["role"] + "|>"
                formatted_prompt += f"{role_tag}\n{entry['content']}</s>\n"
            formatted_prompt += "<|assistant|>\n"
            return formatted_prompt

    def reset_memory(self):
        """Réinitialise l'historique de conversation en conservant uniquement le prompt système."""
        # Sauvegarde du prompt système avant de réinitialiser
        system_prompt = None
        for msg in self.chat_history:
            if msg.get("role") == "system":
                system_prompt = msg
                break

        # Réinitialisation de l'historique
        if system_prompt:
            self.chat_history = [system_prompt]
        else:
            # Si aucun prompt système n'est trouvé, recharge le profil actuel
            self.load_profile(self.profile_id)

        # Génère un nouveau ID de conversation
        self._current_conversation_id = self.conversation_manager.generate_conversation_id()

    def load_profile(self, profile_id):
        """Charge un profil spécifique pour l'IA"""
        profile = get_profile_content(profile_id)
        self.profile_id = profile_id
        self.profile_name = profile["name"]

        # Initialisation de l'historique avec le prompt système du profil
        self.chat_history = [{"role": "system", "content": profile["system_prompt"]}]
        logger.info(f"Profil chargé: {self.profile_name} (ID: {self.profile_id})")

        return True

    def change_profile(self, profile_id):
        """Change le profil de l'IA et réinitialise l'historique"""
        success = self.load_profile(profile_id)
        if success:
            # Génère un nouveau conversation ID pour cette nouvelle session avec profil différent
            self._current_conversation_id = self.conversation_manager.generate_conversation_id()
            return True
        return False

    def load_conversation_history(self, conversation_id):
        """Charge une conversation existante."""
        conversation_data = self.conversation_manager.load_conversation(conversation_id)
        if conversation_data:
            self.chat_history = conversation_data.get("messages", [])
            self._current_conversation_id = conversation_id

            # Vérifie si le profil utilisé est spécifié dans les métadonnées
            metadata = conversation_data.get("metadata", {})
            if "profile_id" in metadata:
                self.profile_id = metadata.get("profile_id")
                self.profile_name = get_profile_content(self.profile_id)["name"]

            return True
        return False

    def get_available_models(self):
        """
        Renvoie la liste des modèles disponibles
        """
        return self.available_models

    def get_current_model(self):
        """
        Renvoie le modèle actuel
        """
        return self.model_path
