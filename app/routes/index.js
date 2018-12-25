import express from 'express';
import hits from './hits';

const router = express.Router();

router.use('/hits', hits);

export default router;
