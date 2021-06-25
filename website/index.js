fetch('http://localhost:5000')
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
