import express from 'express';

import {
  getAllAlbums,
  createAlbum
} from '../controllers/albumController.js';

const router = express.Router();

router.get('/', getAllAlbums);
router.post('/', createAlbum);

export default router;