import express from 'express';
import { hitsStore, commitHit, cleanOverdueHits } from '../actions/hits';

const router = express.Router();

router.get('/', (request, response) => {
  commitHit();
  cleanOverdueHits();
  response.send({ pageviews: hitsStore.total });
});

export default router;
