import logging
import time

from flask import Flask, request, jsonify, Response, json
from flask_cors import CORS

from model import Model

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
#mistral_model = Model("mistral")
mistral_model = None
logger.info("Mistral loaded")
logger.info("All models are loaded")


def llm_response_stream_mocked(_, prompt):
    """
    :param prompt: Prompt text to send to the model
    :return: Generator for streaming response
    """
    try:
        logger.info(f"Starting response generation for prompt: {prompt[:30]}...")  # Log the first part of the prompt
        """
        for chunk in model.generate_response_stream(prompt):
            logger.debug(f"Processing chunk: {chunk[:50]}...")  # Log the first part of the chunk for better tracking
            yield chunk
        """
        mock_tokens = [
            {
                "token": "# Hello",
                "probabilities": [
                    {"token": "Hello", "probability": 0.8},
                    {"token": "Hi", "probability": 0.1},
                    {"token": "Hey", "probability": 0.05},
                    {"token": "Greetings", "probability": 0.03},
                    {"token": "Salutations", "probability": 0.02}
                ]
            },
            {
                "token": "world!",
                "probabilities": [
                    {"token": "world!", "probability": 0.9},
                    {"token": "Earth!", "probability": 0.05},
                    {"token": "everyone!", "probability": 0.03},
                    {"token": "folks!", "probability": 0.01},
                    {"token": "humans!", "probability": 0.01}
                ]
            },
            {
                "token": "*This*",
                "probabilities": [
                    {"token": "This", "probability": 0.7},
                    {"token": "That", "probability": 0.2},
                    {"token": "It", "probability": 0.1}
                ]
            },
            {
                "token": "is",
                "probabilities": [
                    {"token": "is", "probability": 0.85},
                    {"token": "was", "probability": 0.1},
                    {"token": "will be", "probability": 0.05}
                ]
            },
            {
                "token": "_a_",
                "probabilities": [
                    {"token": "a", "probability": 0.95},
                    {"token": "an", "probability": 0.05}
                ]
            },
            {
                "token": "- long",
                "probabilities": [
                    {"token": "long", "probability": 0.6},
                    {"token": "extended", "probability": 0.2},
                    {"token": "lengthy", "probability": 0.1},
                    {"token": "prolonged", "probability": 0.1}
                ]
            },
            {
                "token": "- sentence\n",
                "probabilities": [
                    {"token": "sentence", "probability": 0.75},
                    {"token": "phrase", "probability": 0.15},
                    {"token": "statement", "probability": 0.1}
                ]
            },
            {
                "token": "for",
                "probabilities": [
                    {"token": "for", "probability": 0.9},
                    {"token": "to", "probability": 0.05},
                    {"token": "in", "probability": 0.05}
                ]
            },
            {
                "token": "testing",
                "probabilities": [
                    {"token": "testing", "probability": 0.8},
                    {"token": "examining", "probability": 0.1},
                    {"token": "checking", "probability": 0.1}
                ]
            },
            {
                "token": "purposes.",
                "probabilities": [
                    {"token": "purposes.", "probability": 0.85},
                    {"token": "reasons.", "probability": 0.1},
                    {"token": "goals.", "probability": 0.05}
                ]
            }
        ]

        for token_data in mock_tokens:
            json_data = json.dumps(token_data)
            yield f"data: {json_data}\n\n"  # Format as Server-Sent Events (SSE)
            # sleep 5 seconds
            time.sleep(1)

    except Exception as e:
        logger.error(f"Error generating response: {str(e)}")
        yield f"data: {json.dumps({'error': str(e)})}\n\n"



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

        logger.info(f"Received prompt: {prompt}")

        if not prompt:
            logger.warning("Prompt is required but missing")
            return jsonify({"error": "Prompt is required"}), 400

        logger.info("Using Mistral model")
        return Response(llm_response_stream_mocked(mistral_model, prompt), content_type='text/plain;charset=utf-8',
                        status=200)

    except Exception as e:
        logger.error(f"Error in openai_completions: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/reset-memory', methods=['POST'])
def reset_memory():
    """
    Réinitialise l'historique des conversations.
    """
    logger.info("Resetting conversation memory")
    data = request.json
    logger.info("Received request data: %s", data)
    profil = data.get('profil')
    if mistral_model is not None:
        mistral_model.reset_memory(profil)
    return jsonify({"message": "Mémoire de conversation réinitialisée"}), 200


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
    app.run(debug=True, threaded=True, host='0.0.0.0', port=5000)
