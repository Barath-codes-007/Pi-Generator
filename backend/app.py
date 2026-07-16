from flask import Flask, request, jsonify
from flask_cors import CORS
import gmpy2
from gmpy2 import mpfr, get_context

app = Flask(__name__)
CORS(app)

def calculate_pi(digits):

    bits = int(digits * 3.32192809489) + 100
    get_context().precision = bits

    C = 426880 * gmpy2.sqrt(mpfr(10005))

    M = 1
    L = 13591409
    X = 1
    K = 6
    S = mpfr(L)

    terms = digits // 14 + 1

    for i in range(1, terms):

        M = (M * (K**3 - 16*K)) // (i**3)

        L += 545140134

        X *= -262537412640768000

        S += mpfr(M * L) / X

        K += 12

    return str(C / S)

@app.route("/")
def home():
    return "Pi Generator Backend Running"

@app.route("/generate", methods=["POST"])
def generate():

    data = request.get_json()

    digits = int(data["digits"])

    pi = calculate_pi(digits)

    return jsonify({
        "pi": pi
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)