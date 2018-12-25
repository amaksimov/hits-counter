const app = require('express')();

const PORT = process.env.PORT || 1234;

app.use('/', require('./routes/index.js'));

app.all('*', (request, response) => {
  response.status(404).send({ msg: 'Not found' });
});

module.exports = app.listen(PORT);
