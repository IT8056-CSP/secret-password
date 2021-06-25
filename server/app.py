from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def hello():
    return {'message': 'This is a response from the server 😀😃😄😁😆😅😂🤣'}, 200


if __name__ == "__main__":
    app.run(debug=True)
