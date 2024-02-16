# Development platforms: CA

The objective of this assignement is to create and host a functional RESTful API. For this course assignement, I choose to make a music-based api, mainly with albums and the songs they contain.

## Endpoints

### GET functions
- For searching albums or songs collection
This is when searching the entire collection of albums and songs. 
<br>

GET endpoints:
```
localhost:5000/api/albums
```
```
localhost:5000/api/songs
```

- For searching individual albums or songs
Here, you search for a specific album or song based on their id.
<br>

GET endpoints:
```
localhost:5000/api/albums/:albumId
```
```
localhost:5000/api/songs/:songId
```

- For searching for all songs in one album
This function is exclusive to songs and searches for all songs in a specific album.
<br>

GET endpoints:
```
localhost:5000/api/songs/album/:albumId
```

### POST functions
- For creating new albums or songs.
Here's how you can use the endpoint to create new albums or songs. To create a new album, fill the values this way:
Albums:
```
{
    "name": "name", 
    "artist": "name", 
    "year": number
}
```

Songs:
```
{
    "title": "name",
    "duration": "time",
    "album": "Light sides"
}
```
When assigning an album, the name has to match an existing album's, otherwise, you won't be able to create a new song. 
<br>

POST endpoints:
```
localhost:5000/api/albums
```
```
localhost:5000/api/songs
```

### PUT functions
- For updating albums or songs
Here, you can change each individual value or more at once if needed. With songs, when changing the album, you also change the song's location, meaning it goes from one album to another.
```
{
    "album": "Newest name"
}
```
<br>

PUT endpoints:
```
localhost:5000/api/albums/:albumId
```
```
localhost:5000/api/songs/:songId
```

### DELETE functions
- For deleting an album or song
When deleting an album, everything in it goes away along with the album itself. When deleting a song, it disappears from the songs collection and the songs array in the albums collection.
<br>

DELETE endpoints:
```
localhost:5000/api/albums/:albumId
```
```
localhost:5000/api/songs/:songId
```