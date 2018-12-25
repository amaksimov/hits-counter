import routes from './routes';

const app = require('express')();

const PORT = process.env.PORT || 1234;

app.use('/', routes);

app.all('*', (request, response) => {
  response.status(404).send({ msg: 'Not found' });
});

export default app.listen(PORT);
