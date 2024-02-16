import express from 'express';

import { 
  getAllSongs,
  getSongById,
  getAlbumSongs,
  createSong,
  updateSong,
  deleteSong
} from '../controllers/songController.js';

const router = express.Router();

router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.get('/album/:id', getAlbumSongs);
router.post('/', createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

export default router;