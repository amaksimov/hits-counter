const express = require('express');

const app = express();

const db = require('./db');

const PORT = process.env.PORT || 1234;

app.get('/hits', (request, response) => {
    db.none('INSERT INTO hits(route, created_at) VALUES($1, $2)', [request.originalUrl, new Date()])
        .then(() => {
            const oneMinuteAgo = new Date(new Date() - 60000);

            db.any('select count(*), route from hits where created_at > $1 group by route ', [oneMinuteAgo])
                .then((hits) => {
                    response.send({ pageviews: hits });
                });
        });
});

app.get('*', (request, response) => {
    db.none('INSERT INTO hits(route, created_at) VALUES($1, $2)', [request.originalUrl, new Date()])
        .then(() => {
            response.sendStatus(200);
        });
});

module.exports = app.listen(PORT);
