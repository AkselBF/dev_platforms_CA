import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import albumsRouter from './routers/albumRouters.js';
import songsRouter from './routers/songRouters.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/albums', albumsRouter);
app.use('/api/songs', songsRouter);

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});