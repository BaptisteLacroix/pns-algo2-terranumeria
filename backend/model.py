from threading import Thread

import torch
from huggingface_hub import login
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig, TextIteratorStreamer

from env import HF_TOKEN
from env import CACHE_DIR


class Model:
    MODELS = {
        "mistral": "Faradaylab/ARIA-7B-V3-mistral-french-v1",
        "deepseek": "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
    }

    def __init__(self, model_chosen):
        # Check if GPU is available
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"📌 Using device: {self.device}")
        self.model_name = self.check_and_load_model_name(model_chosen)
        self.tokenizer = None
        self.login_hugging_face()
        self.ai_model = self.load_model()
        if self.tokenizer is not None and self.ai_model is not None:
            print(f"✅ Model {self.model_name} loaded successfully")
        else:
            print("❌ Error loading model or tokenizer")

    @staticmethod
    def login_hugging_face():
        # Login to Hugging Face
        try:
            login(token=HF_TOKEN)
            print("✅ Successfully logged in to Hugging Face")
        except Exception as e:
            print(f"⚠️ Error logging in to Hugging Face: {e}")

    @staticmethod
    def check_and_load_model_name(model_chosen):
        if model_chosen in Model.MODELS:
            return Model.MODELS.get(model_chosen)

    def load_model(self):
        # Load tokenizer and model (loading them globally for reuse)
        try:
            print(f"🔄 Loading tokenizer for {self.model_name}...")
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name, cache_dir=CACHE_DIR)
            self.tokenizer.pad_token = self.tokenizer.eos_token  # Set pad token

            print(f"🔄 Loading model {self.model_name}...")
            quantization_config = BitsAndBytesConfig(
                load_in_4bit=True,
                bnb_4bit_compute_dtype=torch.float16,
                bnb_4bit_use_double_quant=True,
                bnb_4bit_quant_type="nf4",
                llm_int8_enable_fp32_cpu_offload=True  # Enable CPU offloading
            )

            return AutoModelForCausalLM.from_pretrained(
                self.model_name,
                device_map="auto",  # Automatically distribute model across available devices
                quantization_config=quantization_config,
                cache_dir=CACHE_DIR
            )
        except Exception as e:
            print(f"❌ Error loading model or tokenizer: {e}")

    def generate_response_stream(self, prompt):
        """
        Generate streaming response from the language model
        """
        if self.ai_model is None or self.tokenizer is None:
            yield "Error: Model not loaded correctly."
            return

        try:
            # Prepare input
            inputs = self.tokenizer(prompt, return_tensors="pt").to(self.device)

            # Setup streamer
            streamer = TextIteratorStreamer(self.tokenizer, skip_prompt=True, timeout=10.0)

            # Create generation config
            generation_kwargs = dict(
                inputs=inputs["input_ids"],
                attention_mask=inputs["attention_mask"],
                max_new_tokens=512,
                temperature=0.7,
                top_p=0.95,
                do_sample=True,
                streamer=streamer
            )

            # Start generation in a separate thread
            generation_thread = Thread(target=self.ai_model.generate, kwargs=generation_kwargs)
            generation_thread.start()

            # Stream the response
            for chunk in streamer:
                yield chunk

        except Exception as e:
            yield f"Error generating response: {str(e)}"
