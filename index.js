const express = require('express')
const app = express()

var pgp = require('pg-promise')();
const db = pgp('postgres://postgres:postgres@db:5432/hits-counter_dev');

app.get('/', function (request, response) {
    db.none('INSERT INTO hits(created_at) VALUES(${timestamp})', {
        timestamp: new Date()
    })

    db.one('select count(*) from hits where created_at > $1', [ new Date(new Date() - 60000)], c => +c.count)
        .then(count => {
            response.send({pageviews: count});
        });
});

app.listen(1234)
