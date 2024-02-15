import { client } from '../config/db.js';
import mongodb from 'mongodb';

// Get all albums
const getAllAlbums = async (req, res) => {
  try {
    const albumsCollection = client.db('musicTesting').collection('albums');
    const albums = await albumsCollection.find().toArray();
    res.json(albums);
  } 
  catch (error) {
    console.error('Error getting albums:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new album
const createAlbum = async (req, res) => {
  try {
    const { name, artist, year, songs } = req.body;
    console.log('Received request to create album:', { name, artist, year, songs });
    
    if (!name || !artist || !year) {
      return res.status(400).json({ message: 'Missing required fields: name, artist, year' });
    }
    
    const album = { name, artist, year, songs };
    console.log('Album object:', album);
    
    const albumsCollection = client.db('musicTesting').collection('albums');
    const result = await albumsCollection.insertOne(album);
    
    console.log('Insertion Result:', result);
    
    if (!result || !result.insertedId) {
      throw new Error('No album document returned after insertion');
    }
    
    const insertedAlbum = await albumsCollection.findOne({ _id: result.insertedId });
    if (!insertedAlbum) {
      throw new Error('Inserted album document not found');
    }
    
    console.log('Album created successfully:', insertedAlbum);
    res.status(201).json({ message: 'Album created successfully', album: insertedAlbum });
  } 
  catch (error) {
    console.error('Error creating album:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to delete an album
const deleteAlbum = async (req, res) => {
    try {
        const albumsCollection = client.db('musicTesting').collection('albums');
        const result = await albumsCollection.deleteOne({ _id: mongodb.ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.json({ message: 'Album deleted successfully' });
    } catch (error) {
        console.error('Error deleting album:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export {
  getAllAlbums,
  createAlbum,
  deleteAlbum
};