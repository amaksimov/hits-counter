import express from 'express';
import { hitsStore, commitHit, cleanOverdueHits } from '../actions/hits';


const app = express();

app.get('/', (request, response) => {
  commitHit();
  cleanOverdueHits();
  response.send({ pageviews: hitsStore.total });
});

export default app;
