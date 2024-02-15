import express from 'express';

import { 
  getAllSongs,
  createSong
} from '../controllers/songController.js';

const router = express.Router();

router.get('/', getAllSongs);
router.get('/:id', createSong);

export default router;