import { client } from '../config/db.js';
import mongodb from 'mongodb';

const { ObjectId } = mongodb;

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

// Get a single album via ID
const getAlbumById = async (req, res) => {
  try {
    const albumsCollection = client.db('musicTesting').collection('albums');
    const album = await albumsCollection.findOne({ _id: ObjectId.createFromHexString(req.params.id) });
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    res.json(album);
  } 
  catch (error) {
    console.error('Error getting album by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new album
const createAlbum = async (req, res) => {
  try {
    const { name, artist, year } = req.body;
    
    if (!name || !artist || !year) {
      return res.status(400).json({ message: 'Missing required fields: name, artist, year' });
    }
        
    const albumsCollection = client.db('musicTesting').collection('albums');
    const album = { name, artist, year, songs: [] }; // Initialize songs array as empty
    const result = await albumsCollection.insertOne(album);
        
    if (!result || !result.insertedId) {
      throw new Error('No album document returned after insertion');
    }
        
    const insertedAlbum = await albumsCollection.findOne({ _id: result.insertedId });
    if (!insertedAlbum) {
      throw new Error('Inserted album document not found');
    }
        
    res.status(201).json({ message: 'Album created successfully', album: insertedAlbum });
  } 
  catch (error) {
    console.error('Error creating album:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an existing album
const updateAlbum = async (req, res) => {
  try {
    const { name, artist, year, songs } = req.body;
    const updateFields = {};
        
    if (name) updateFields.name = name;
    if (artist) updateFields.artist = artist;
    if (year) updateFields.year = year;
    if (songs) updateFields.songs = songs;
    
    const albumsCollection = client.db('musicTesting').collection('albums');
    const result = await albumsCollection.updateOne(
      { _id: ObjectId.createFromHexString(req.params.id) },
      { $set: updateFields }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Album not found' });
    }
    
    res.json({ message: 'Album updated successfully' });
  } 
  catch (error) {
    console.error('Error updating album:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to delete an album
const deleteAlbum = async (req, res) => {
  try {
    const albumsCollection = client.db('musicTesting').collection('albums');
    const result = await albumsCollection.deleteOne({ _id: ObjectId.createFromHexString(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Album not found' });
    }

    res.json({ message: 'Album deleted successfully' });
  } 
  catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum
};