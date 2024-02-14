import mongodb from 'mongodb';
const { ObjectID } = mongodb;
import { client } from '../config/db.js';

const getAllAlbums = async (req, res) => {
    try {
        const albumsCollection = client.db().collection('albums');
        const albums = await albumsCollection.find().toArray();
        res.json(albums);
    } catch (error) {
        console.error('Error getting albums:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {
  getAllAlbums
};