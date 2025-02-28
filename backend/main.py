import os
import time
from flask import Flask, request, jsonify, Response

app = Flask(__name__)

API_KEY = os.getenv('API_KEY', 'your-api-key-here')


# Mock function to simulate ChatGPT processing
def chatgpt_response_stream(prompt):
    """
    Mock function to simulate ChatGPT processing and stream the response
    :param prompt: Prompt text
    :return: Generator for streaming response
    """
    chunks = [
        "Sure! I'm happy to help you with that.\n",
        "Let's start with the basics. First, we'll set up the routes...\n",
        "I will explain how to stream data and handle responses.\n",
        "This is how you can structure the API for your custom ChatGPT model.\n"
    ]

    for chunk in chunks:
        yield chunk
        time.sleep(2)  # Simulating delay in response generation


@app.before_request
def check_api_key():
    """
    Middleware to check API Key in the request headers
    :return: JSON response if unauthorized
    """
    if request.endpoint != 'health' and request.endpoint != 'openai_completions':
        api_key = request.headers.get('Authorization')
        if not api_key or api_key != f"Bearer {API_KEY}":
            return jsonify({"error": "Unauthorized"}), 401


@app.route('/v1/completions', methods=['POST'])
def openai_completions():
    """
    Route to handle chat completions
    :return: Response object
    """
    try:
        data = request.json

        # Validate the required data in the request
        prompt = data.get('prompt', '')
        model = data.get('model', 'gpt-3.5-turbo')

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        if model != 'gpt-3.5-turbo':
            return jsonify({"error": "Invalid model specified"}), 400

        return Response(chatgpt_response_stream(prompt), content_type='text/plain;charset=utf-8', status=200)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/v1/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    :return: JSON response
    """
    return jsonify({"status": "ok"}), 200


if __name__ == '__main__':
    app.run(debug=True, threaded=True, host='0.0.0.0', port=5000)
