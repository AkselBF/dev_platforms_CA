import express from 'express';

import {
  getAllAlbums,
  createAlbum,
  deleteAlbum
} from '../controllers/albumController.js';

const router = express.Router();

router.get('/', getAllAlbums);
router.post('/', createAlbum);
router.delete('/:id', deleteAlbum);

export default router;