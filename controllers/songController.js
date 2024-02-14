import mongodb from 'mongodb';
const { ObjectID } = mongodb;
import { client } from '../config/db.js';

const getAllSongs = async (req, res) => {
    try {
        const songsCollection = client.db().collection('songs');
        const songs = await songsCollection.find().toArray();
        res.json(songs);
    } catch (error) {
        console.error('Error getting songs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {
  getAllSongs
};