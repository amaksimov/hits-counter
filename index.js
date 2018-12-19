const express = require('express');

const app = express();

const pgp = require('pg-promise')();

const db = pgp(process.env.DATABASE_URL);

app.get('/', (request, response) => {
    db.none('INSERT INTO hits(created_at) VALUES($1)', [new Date()])
        .then(() => {
            const oneMinuteAgo = new Date(new Date() - 60000);

            db.one('select count(*) from hits where created_at > $1', [oneMinuteAgo], c => +c.count)
                .then((count) => {
                    response.send({ pageviews: count });
                });
        });
});

app.listen(1234);
