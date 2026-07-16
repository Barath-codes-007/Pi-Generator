from flask import Flask, request, jsonify
from flask_cors import CORS
import mpmath as mp

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Pi Generator Backend Running!"

@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.get_json()
        digits = int(data["digits"])

        if digits < 1:
            return jsonify({"error": "Digits must be greater than 0"}), 400

        # Set precision
        mp.mp.dps = digits + 5

        # Calculate π
        pi = str(mp.pi)

        return jsonify({
            "pi": pi,
            "digits": digits
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)