const host = 'https://secret-password.herokuapp.com';
fetch(`${host}`)
    .then(function (response) {
        if (response.status === 200) console.log('%cConnected to backend!', 'color: green');
        return response.json();
    })
    .then(function (json) {
        console.log(json);
    })
    .catch(function (error) {
        console.error('Failed to connect to backend! Error: ', error);
    });

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-button');
    const guessButton = document.getElementById('guess-button');
    const sessionIdInput = document.getElementById('session-id-input');
    const guessAttemptInput = document.getElementById('guess-input');
    const histories = document.getElementById('histories');

    startButton.addEventListener('click', function () {
        this.setAttribute('disabled', true);
        fetch(`${host}/game`, { method: 'POST' })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                if (json.error) {
                    return alert(json.error);
                }
                const sessionId = json.session_id;
                sessionIdInput.value = sessionId;
            })
            .finally(() => this.removeAttribute('disabled'));
    });

    guessButton.addEventListener('click', function () {
        this.setAttribute('disabled', true);
        const guess = guessAttemptInput.value;
        const sessionId = sessionIdInput.value;
        if (!sessionIdInput.reportValidity() || !guessAttemptInput.reportValidity()) {
            return;
        }
        fetch(`${host}/game/${sessionId}/${guess}`, { method: 'POST' })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                if (json.error) {
                    return alert(json.error);
                }
                let result = guess;
                if (json.solved) {
                    result += '✔️';
                } else if (json.higher) {
                    result += '☝️';
                } else if (json.lower) {
                    result += '👇';
                }
                const history = document.createElement('div');
                history.classList.add('history');
                history.innerHTML = result;
                histories.prepend(history);
            })
            .finally(() => this.removeAttribute('disabled'));
    });
});
