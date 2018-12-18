const express = require('express')
const storage = require('node-persist');
const app = express()

// Set storage ttl to be 2 seconds.
const ttl = 2000;

app.use(require('express-session')({

        name: '_es_demo',
        secret: '1234', // The secret is required, and is used for signing cookies
        resave: false, // Force save of session for each request.
        saveUninitialized: false // Save a session that is new, but has not been modified

    }));

app.get('/', function (request, response) {
    if (!request.session.count) {
        request.session.count = 0;
    }
    request.session.count += 1;
    response.json(request.session);
});

app.listen(1234)
