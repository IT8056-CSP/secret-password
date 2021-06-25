from werkzeug.exceptions import HTTPException
from flask import Flask, request, json
from flask_cors import CORS
from random import randrange
import shortuuid

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def hello():
    return {'message': 'This is a response from the server 😀😃😄😁😆😅😂🤣'}, 200


sessions = {}


@app.route('/game', methods=['POST'])
def create_session():
    session_id = shortuuid.uuid()[:10]
    sessions[session_id] = randrange(1, 100, 1)
    return {'session_id': session_id}, 201


@app.route('/game/<session_id>/<int:guess>', methods=['POST'])
def guess(session_id, guess):
    if not session_id in sessions:
        return {'error': 'Unknown Session Id "{}"!'.format(session_id)}, 400
    secret = sessions[session_id]
    higher = guess < secret
    lower = guess > secret
    solved = guess == secret
    return {
        'higher': higher,
        'lower': lower,
        'solved': solved,
    }, 200


@app.errorhandler(404)
def not_found(e):
    return {'error': 'Resource {} {} Not Found!'.format(request.method, request.url)}, 404


@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "error": e.description,
    })
    response.content_type = "application/json"
    return response


if __name__ == "__main__":
    app.run(debug=True)
