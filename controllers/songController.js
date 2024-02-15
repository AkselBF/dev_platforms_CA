import { client } from '../config/db.js';
import mongodb from 'mongodb';

const { ObjectId } = mongodb;

// Function to get all songs in an album
const getAllSongs = async (req, res) => {
  try {
    const { albumId } = req.params;
    const songsCollection = client.db('musicTesting').collection('songs');
    const songs = await songsCollection.find({ album: ObjectId.createFromHexString(albumId) }).toArray();
    res.json(songs);
  } 
  catch (error) {
    console.error('Error getting songs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new song
const createSong = async (req, res) => {
  try {
    const { title, duration, album } = req.body;
        
    if (!title || !duration || !album) {
      return res.status(400).json({ message: 'Missing required fields: title, duration, album' });
    }
            
    const songsCollection = client.db('musicTesting').collection('songs');
    const song = { title, duration, album };
    const result = await songsCollection.insertOne(song);
            
    if (!result || !result.insertedId) {
      throw new Error('No song document returned after insertion');
    }
            
    const insertedSong = await songsCollection.findOne({ _id: new ObjectId(result.insertedId) });
    if (!insertedSong) {
      throw new Error('Inserted song document not found');
    }
        
    // Update the corresponding album document to add the song to its songs array
    const albumsCollection = client.db('musicTesting').collection('albums');
    await albumsCollection.updateOne(
      { name: album },
      { $push: { songs: insertedSong._id } }
    );
            
    res.status(201).json({ message: 'Song created successfully', song: insertedSong });
  } 
  catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  getAllSongs,
  createSong
};