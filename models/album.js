export const albumSchema = {
  name: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number, required: true },
  songs: [ObjectID]
};