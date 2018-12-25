import express from 'express';

const app = express();

app.use('/hits', require('./hits'));

app.all('*', (request, response) => {
  response.status(404).send({ msg: 'Not found' });
});

export default app;
