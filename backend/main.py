import time

from flask import Flask, request, jsonify, Response
from flask_cors import CORS

from env import API_KEY
from model import Model

app = Flask(__name__)

CORS(app)

print("Loading models")
print("Loading Mistral")
mistral_model = Model("mistral")
print("Mistral loaded")
print("Loading DeepSeek")
deepseek_model = Model("deepseek")
print("DeepSeek loaded")
print("All models are load")


def chatgpt_response_stream(model, prompt):
    """
    :param model: The model to use ('mistral' or 'deepseek')
    :param prompt: Prompt text to send to the model
    :return: Generator for streaming response
    """
    try:
        for chunk in model.generate_response_stream(prompt):
            print(f"Processing chunk: {chunk}")
            yield chunk
    except Exception as e:
        yield f"Error generating response: {str(e)}"


@app.before_request
def check_api_key():
    """
    Middleware to check API Key in the request headers.
    :return: JSON response if unauthorized
    """
    if request.endpoint != 'health' and request.endpoint != 'openai_completions':
        api_key = request.headers.get('Authorization')
        if not api_key or api_key != f"Bearer {API_KEY}":
            return jsonify({"error": "Unauthorized"}), 401


@app.route('/responses', methods=['POST'])
def openai_completions():
    """
    Route to handle chat completions with streaming response.
    :return: Streaming response
    """
    try:
        data = request.json

        # Validate the required data in the request
        prompt = data.get('prompt', '')
        model = data.get('model', 'mistrail')

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        if model == 'deepseek':
            return Response(chatgpt_response_stream(deepseek_model, prompt), content_type='text/plain;charset=utf-8', status=200)
        return Response(chatgpt_response_stream(mistral_model, prompt), content_type='text/plain;charset=utf-8', status=200)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint.
    """
    return jsonify({
        "status": "ok",
    }), 200


if __name__ == '__main__':
    app.run(debug=True, threaded=True, host='0.0.0.0', port=5000)
