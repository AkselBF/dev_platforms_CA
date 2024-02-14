import express from 'express';

import {
    getAllAlbums
} from '../controllers/albumController.js';

const router = express.Router();
router.get('/', getAllAlbums);

export default router;