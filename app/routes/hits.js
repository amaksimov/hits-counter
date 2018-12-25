const app = module.exports = require('express')();

const {hitsStore, commitHit,cleanOverdueHits} = require('../actions/hits.js');

app.get('/', (request, response) => {
  commitHit();
  cleanOverdueHits();
  response.send({ pageviews: hitsStore.total });
});
