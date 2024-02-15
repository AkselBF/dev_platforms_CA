import express from 'express';

import { 
  getAllSongs,
  getSongById,
  createSong
} from '../controllers/songController.js';

const router = express.Router();

router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.post('/', createSong);

export default router;