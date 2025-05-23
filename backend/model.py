import json
import logging
import queue as _queue
import sys
import time
from threading import Thread

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
        # Check if GPU is available
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"📌 Using device: {self.device}")
        self.model_path = self.check_and_get_model_path(model_category, model_id)
        self.tokenizer = None
        self.login_hugging_face()
        self.ai_model, exception = self.load_model()
        if self.tokenizer is not None and self.ai_model is not None:
            logger.info(f"✅ Model {self.model_path} loaded successfully")
        else:
            logger.info(f"❌ Error loading model or tokenizer: {str(exception)}")

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

    def load_model(self):
        # Load model and tokenizer (loading them globally for reuse)
        try:
            device_map = {"": 0}  # Map all modules to GPU 0 by default
            quantization_config = BitsAndBytesConfig(
                load_in_4bit=True,
                bnb_4bit_compute_dtype=torch.float16,
                bnb_4bit_use_double_quant=False,
                bnb_4bit_quant_type="nf4",
                llm_int8_enable_fp32_cpu_offload=True  # Enable CPU offloading for modules that don't fit in GPU
            )
            logger.info(f"🔄 Loading model {self.model_path}...")
            # Wrapping the model loading call—LoadTime will provide a progress bar based on previous loading times.
            model = LoadTime(name=self.model_path,
                             fn=lambda: AutoModelForCausalLM.from_pretrained(
                                 self.model_path,
                                 torch_dtype=torch.float16,
                                 device_map=device_map,
                                 quantization_config=quantization_config,
                                 cache_dir=CACHE_DIR,
                                 offload_folder="offload",  # Specify a folder for disk offloading
                                 offload_state_dict=True,  # Enable state dict offloading to save GPU memory
                                 low_cpu_mem_usage=True  # Optimize CPU memory usage
                             ))()
            logger.info("✅ Model loaded successfully")
            # Then load the tokenizer (note: loading the tokenizer after the model is recommended)
            logger.info(f"🔄 Loading tokenizer for {self.model_path}...")
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_path, cache_dir=CACHE_DIR)
            self.tokenizer.pad_token = self.tokenizer.eos_token  # Set pad token
            logger.info(f"✅ Tokenizer {self.model_path} loaded successfully")
            return model, None
        except Exception as e:
            logger.info(f"❌ Error loading model or tokenizer: {e}")
            return None, e

    def generate_response_stream(self, prompt, temperature=0.7, top_p=0.1):
        """
        Generate streaming response from the language model with token probabilities
        """

        if self.ai_model is None or self.tokenizer is None:
            json_error = json.dumps({"error": "Model not loaded correctly."})
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

            # Setup streamer
            streamer = TextIteratorStreamer(self.tokenizer, skip_prompt=True, timeout=900.0)

            # Configure generation with logits processor for probabilities
            generation_kwargs = dict(
                inputs=input_ids,
                attention_mask=attention_mask,
                max_new_tokens=512,
                temperature=temperature,
                top_p=top_p,
                do_sample=True,
                streamer=streamer,
                logits_processor=[self.prob_processor],
                output_scores=True,
                return_dict_in_generate=True
            )

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
        Construit le prompt en intégrant l'historique sous la forme :
        <|user|>
        Question</s>
        <|assistant|>
        Réponse</s>
        """
        self.chat_history.append({"role": "user", "content": prompt})

        # Construire le prompt formaté
        formatted_prompt = ""
        for entry in self.chat_history:
            role_tag = "<|" + entry["role"] + "|>"
            formatted_prompt += f"{role_tag}\n{entry['content']}</s>\n"
        formatted_prompt += "<|assistant|>\n"  # TODO changer le nom assitant pour un meilleur role play
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
