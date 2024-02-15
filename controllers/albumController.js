import mongodb from 'mongodb';
const { ObjectID } = mongodb;
import { client } from '../config/db.js';

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
    
    // Check if required fields are present
    if (!name || !artist || !year) {
      return res.status(400).json({ message: 'Missing required fields: name, artist, year' });
    }
    
    const album = { name, artist, year, songs };
    console.log('Album object:', album);
    
    const albumsCollection = client.db('musicTesting').collection('albums');
    const result = await albumsCollection.insertOne(album);
    
    console.log('Insertion Result:', result);
    
    // Check if any albums were inserted
    if (!result || !result.insertedId) {
      throw new Error('No album document returned after insertion');
    }
    
    // Fetch the inserted album document
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

export {
  getAllAlbums,
  createAlbum
};