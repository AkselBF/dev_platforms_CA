import express from 'express';

import {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  deleteAlbum
} from '../controllers/albumController.js';

const router = express.Router();

router.get('/', getAllAlbums);
router.get('/:id', getAlbumById);
router.post('/', createAlbum);
router.delete('/:id', deleteAlbum);

export default router;