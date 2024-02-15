import express from 'express';

import { 
  getAllSongs,
  createSong
} from '../controllers/songController.js';

const router = express.Router();

router.get('/:albumId', getAllSongs);
router.post('/', createSong);

export default router;