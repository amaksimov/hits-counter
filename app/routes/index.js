const app = module.exports = require('express')();

app.use('/hits', require('./hits'));

app.all('*', (request, response) => {
  response.status(404).send({ msg: 'Not found' });
});
