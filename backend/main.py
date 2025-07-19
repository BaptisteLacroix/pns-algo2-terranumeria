import logging
import re
import sys
import traceback
import time
import threading

from flask import Flask, request, jsonify, Response
from flask_cors import CORS

from conversation_manager import ConversationManager
from model import Model
from profiles.profiles import get_profile_names

# Set up logging
logger = logging.getLogger("FlaskAppLogger")
logger.setLevel(logging.DEBUG)
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

app = Flask(__name__)

CORS(app)

# Initialize model as None to be loaded in background
model = None

def load_model_in_background():
    """Loads the model in a background thread to allow the Flask app to start immediately"""
    global model
    logger.info("Loading model in background...")
    
    try:
        # Start with default model
        temp_model = Model(model_category="Faradaylab", model_id="ARIA-7B-V3-mistral-french-v1", profile_id="default")
        
        # Pas de fallback vers un modèle plus petit comme demandé
        if temp_model.ai_model is None:
            logger.error("❌ Failed to load model, no fallback to smaller models will be attempted")
        
        model = temp_model
        if model.ai_model is not None:
            logger.info("✅ Model successfully loaded and ready for use")
        else:
            logger.warning("⚠️ Model loading failed, application will run with limited functionality")
    except Exception as e:
        logger.error(f"❌ Critical error during model loading: {str(e)}")
        logger.error(traceback.format_exc())
        # Create a minimal model instance to avoid breaking the application
        model = Model(model_category="Faradaylab", model_id="ARIA-7B-V3-mistral-french-v1", profile_id="default")
        
# Start loading the model in background
loading_thread = threading.Thread(target=load_model_in_background)
loading_thread.daemon = True
loading_thread.start()

logger.info("Server started. Model loading in progress...")

# Initialisation du gestionnaire de conversations
conversation_manager = ConversationManager()


def llm_response_stream(model_to_use, prompt, temperature, top_p):
    """
    :param model_to_use:
    :param prompt: Prompt text to send to the model
    :param temperature:
    :param top_p:
    :return: Generator for streaming response
    """
    try:
        logger.info(f"Starting response generation for prompt: {prompt[:30]}...")  # Log the first part of the prompt
        for chunk in model_to_use.generate_response_stream(prompt, temperature, top_p):
            logger.debug(f"Processing chunk: {chunk[:100]}...")  # Log the first part of the chunk for better tracking
            yield chunk
    except Exception as e:
        error_traceback = traceback.format_exc()
        logger.error(f"Error generating response: {str(e)}\n{error_traceback}")
        yield f"Error generating response: {str(e)}"


@app.route('/api/responses', methods=['POST'])
def llm_completions():
    """
    Route to handle chat completions with streaming response.
    :return: Streaming response
    """
    try:
        if model is None or model.ai_model is None:
            if loading_thread.is_alive():
                return jsonify({
                    "error": "Model is still loading. Please try again in a few minutes.",
                    "status": "loading"
                }), 503
            else:
                return jsonify({
                    "error": "Model failed to load. Please check server logs.",
                    "status": "failed"
                }), 500
        
        data = request.json
        logger.info("Received request data: %s", data)

        # Validate the required data in the request
        prompt = data.get('prompt', '')
        temperature = data.get('temperature', 0.7)
        top_p = data.get('topP', 0.1)
        conversation_id = data.get('conversation_id', None)
        profile_id = data.get('profile_id', None)  # Nouveau: profile_id pour choisir un profil

        logger.info(f"Received prompt: {prompt}")

        if profile_id and model.profile_id != profile_id:
            success = model.change_profile(profile_id)
            if success:
                logger.info(f"Profile changed to {profile_id}")
            else:
                logger.warning(f"Failed to change profile to {profile_id}")

        # Si un ID de conversation est fourni, charge cette conversation
        if conversation_id:
            success = model.load_conversation_history(conversation_id)
            if not success:
                logger.error(f"Conversation not found: {conversation_id}")
                model.reset_memory()
                model.current_conversation_id = conversation_id
                logger.info(f"Created new conversation with ID: {conversation_id}")

        if not prompt:
            logger.warning("Prompt is required but missing")
            return jsonify({"error": "Prompt is required"}), 400

        logger.info(f"Using model: {model.model_path}")
        return Response(llm_response_stream(model, prompt, temperature, top_p),
                        content_type='text/event-stream',
                        status=200)

    except Exception as e:
        import traceback
        logger.error(f"Error in llm_completions: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500


@app.route('/api/conversations', methods=['GET'])
def get_conversations():
    """
    Récupère toutes les conversations sauvegardées.
    """
    try:
        conversations = conversation_manager.get_all_conversations()
        return jsonify({"conversations": conversations}), 200
    except Exception as e:
        logger.error(f"Error getting conversations: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/conversations/<conversation_id>', methods=['GET'])
def get_conversation(conversation_id):
    """
    Récupère une conversation spécifique.
    """
    try:
        conversation = conversation_manager.load_conversation(conversation_id)
        if conversation:
            return jsonify(conversation), 200
        return jsonify({"error": "Conversation not found"}), 404
    except Exception as e:
        logger.error(f"Error getting conversation: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/conversations/<conversation_id>', methods=['DELETE'])
def delete_conversation(conversation_id):
    """
    Supprime une conversation.
    """
    try:
        success = conversation_manager.delete_conversation(conversation_id)
        if success:
            return jsonify({"message": "Conversation deleted successfully"}), 200
        return jsonify({"error": "Conversation not found"}), 404
    except Exception as e:
        logger.error(f"Error deleting conversation: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/reset-memory', methods=['POST'])
def reset_memory():
    """
    Réinitialise l'historique des conversations.
    """
    try:
        data = request.json or {}
        profile_id = data.get('profile_id')

        if profile_id:
            model.change_profile(profile_id)
            logger.info(f"Memory reset with new profile: {profile_id}")
        else:
            # Reset standard
            model.reset_memory()
            logger.info("Memory reset with current profile")

        return jsonify({

            # Renvoie l'ID de conversation et les infos du profil actuel
            "message": "Mémoire de conversation réinitialisée",
            "conversation_id": model.current_conversation_id,
            "profile": {
                "id": model.profile_id,
                "name": model.profile_name
            }
        }), 200
    except Exception as e:
        logger.error(f"Error resetting memory: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/profiles', methods=['GET'])
def get_available_profiles():
    """
    Récupère la liste des profils disponibles pour l'IA.
    """
    try:
        profiles = get_profile_names()
        return jsonify({"profiles": profiles}), 200
    except Exception as e:
        logger.error(f"Error getting profiles: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/profiles/current', methods=['GET'])
def get_current_profile():
    """
    Récupère le profil actuel utilisé par l'IA.
    """
    try:
        profile_info = {
            "id": model.profile_id,
            "name": model.profile_name
        }
        return jsonify(profile_info), 200
    except Exception as e:
        logger.error(f"Error getting current profile: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/profiles/change', methods=['POST'])
def change_profile():
    """
    Change le profil utilisé par l'IA.
    """
    try:
        data = request.json
        if not data or 'profile_id' not in data:
            return jsonify({"error": "profile_id is required"}), 400

        profile_id = data['profile_id']
        success = model.change_profile(profile_id)

        if success:
            return jsonify({
                "message": f"Profile changed to {profile_id}",
                "profile": {
                    "id": model.profile_id,
                    "name": model.profile_name
                },
                "conversation_id": model.current_conversation_id
            }), 200
        else:
            return jsonify({"error": f"Invalid profile ID: {profile_id}"}), 400

    except Exception as e:
        logger.error(f"Error changing profile: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/models/<model_category>/<model_id>', methods=['PUT'])
def set_model(model_category, model_id):
    """
    Set the selected model by its ID (either pre-configured model or Hugging Face model).
    """
    try:
        model_path, exception = model.change_model(model_category, model_id)
        if exception:
            logger.error(f"Error changing model: {exception}")
            return jsonify({"error": str(exception)}), 400
        return jsonify(
            {
                "message": f"Model '{model_id}' has been set successfully.",
                "currentModel": model_path
            }
        ), 200
    except Exception as e:
        logger.error(f"Error setting model: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/models/custom', methods=['POST'])
def set_custom_model():
    """
    Set a custom model by specifying a category, model ID, and model URL.
    If only a URL is provided, it will extract the group, model ID, and URL.
    """
    try:
        data = request.json
        model_url = data.get("modelUrl")

        # Case 1: If URL is provided, extract the group, model ID, and model URL
        if model_url:
            # Regex to match Hugging Face model URL structure (e.g., https://huggingface.co/group/model_name)
            match = re.match(r"https://huggingface.co/([^/]+)/([^/]+)", model_url)
            if match:
                group = match.group(1)
                model_name = match.group(2)
                model_id = f"{group}-{model_name}"
                category = group
                available_models = model.update_available_models(category, model_id, model_url)
                return jsonify({
                    "message": f"Custom model '{model_id}' under category '{category}' added successfully.",
                    "models": available_models
                }), 200
            else:
                return jsonify({"error": "Invalid Hugging Face model URL format."}), 400
        return jsonify({"error": "ModelUrl is required."}), 400

    except Exception as e:
        logger.error(f"Error setting custom model: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/models', methods=['GET'])
def get_models():
    """
    Get a list of available models, grouped by category.
    """
    try:
        # Return models grouped by category
        return jsonify({"models": model.get_available_models()}), 200
    except Exception as e:
        logger.error(f"Error fetching models: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/models/current', methods=['GET'])
def get_current_model():
    """
    Get the currently set model.
    """
    try:
        current_model = model.get_current_model()
        return jsonify({"currentModel": current_model}), 200
    except Exception as e:
        logger.error(f"Error fetching current model: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint that provides system status including model loading state.
    """
    logger.info("Health check request received")
    
    # Check model loading status
    if model is None:
        if loading_thread.is_alive():
            model_status = "loading"
        else:
            model_status = "failed"
        model_name = "unknown"
    else:
        if model.ai_model is None:
            model_status = "failed"
            model_name = model.model_path if hasattr(model, 'model_path') else "unknown"
        else:
            model_status = "ready"
            model_name = model.model_path
    
    return jsonify({
        "status": "ok",
        "model_status": model_status,
        "model_name": model_name,
        "server_time": time.strftime("%Y-%m-%d %H:%M:%S"),
    }), 200


if __name__ == '__main__':
    logger.info("Starting Flask app")
    if len(sys.argv) < 2:
        print("Usage: python -u -m main <HF_TOKEN> <CACHE_DIR>")
        sys.exit(1)
    app.run(debug=False, threaded=True, host='0.0.0.0', port=5000)
