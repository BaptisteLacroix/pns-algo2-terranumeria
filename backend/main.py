import logging
from flask import Flask, request, jsonify, Response
from flask_cors import CORS

from model import Model
from conversation_manager import ConversationManager

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

logger.info("Loading models")
logger.info("Loading Mistral")
mistral_model = Model("mistral")
logger.info("Mistral loaded")
logger.info("All models are loaded")

# Initialisation du gestionnaire de conversations
conversation_manager = ConversationManager()

def llm_response_stream(model, prompt):
    """
    :param prompt: Prompt text to send to the model
    :return: Generator for streaming response
    """
    try:
        logger.info(f"Starting response generation for prompt: {prompt[:30]}...")  # Log the first part of the prompt
        for chunk in model.generate_response_stream(prompt):
            logger.debug(f"Processing chunk: {chunk[:50]}...")  # Log the first part of the chunk for better tracking
            yield chunk
    except Exception as e:
        logger.error(f"Error generating response: {str(e)}")
        yield f"Error generating response: {str(e)}"


@app.route('/responses', methods=['POST'])
def llm_completions():
    """
    Route to handle chat completions with streaming response.
    :return: Streaming response
    """
    try:
        data = request.json
        logger.info("Received request data: %s", data)

        # Validate the required data in the request
        prompt = data.get('prompt', '')
        model = data.get('model', 'mistral')
        conversation_id = data.get('conversation_id', None)

        logger.info(f"Received prompt: {prompt}")

        # Si un ID de conversation est fourni, charge cette conversation
        if conversation_id:
            if model == 'mistral':
                success = mistral_model.load_conversation_history(conversation_id)
                if not success:
                    return jsonify({"error": "Conversation not found"}), 404
            else:
                success = deepseek_model.load_conversation_history(conversation_id)
                if not success:
                    return jsonify({"error": "Conversation not found"}), 404

        if not prompt:
            logger.warning("Prompt is required but missing")
            return jsonify({"error": "Prompt is required"}), 400

        logger.info("Using Mistral model")
        return Response(llm_response_stream(mistral_model, prompt), content_type='text/plain;charset=utf-8',
                        status=200)

    except Exception as e:
        logger.error(f"Error in openai_completions: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/conversations', methods=['GET'])
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


@app.route('/conversations/<conversation_id>', methods=['GET'])
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


@app.route('/conversations/<conversation_id>', methods=['DELETE'])
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


@app.route('/reset-memory', methods=['POST'])
def reset_memory():
    """
    Réinitialise l'historique des conversations.
    """
    try:
        mistral_model.reset_memory()
        # deepseek_model.reset_memory()
        return jsonify({
            "message": "Mémoire de conversation réinitialisée",
            "conversation_id": mistral_model.current_conversation_id
        }), 200
    except Exception as e:
        logger.error(f"Error resetting memory: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint.
    """
    logger.info("Health check request received")
    return jsonify({
        "status": "ok",
    }), 200


if __name__ == '__main__':
    logger.info("Starting Flask app")
    app.run(debug=False, threaded=True, host='0.0.0.0', port=5000)
