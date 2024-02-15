import mongodb from 'mongodb';
const { ObjectID } = mongodb;
import { client } from '../config/db.js';

// Get all songs
const getAllSongs = async (req, res) => {
  try {
    const songsCollection = client.db('musicTesting').collection('songs');
    const songs = await songsCollection.find().toArray();
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
    const { name, length, album } = req.body;
    const song = { name, length, album };
    const songsCollection = client.db('musicTesting').collection('songs');
    const result = await songsCollection.insertOne(song);
    res.status(201).json({ message: 'Song created successfully', song: result.ops[0] });
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