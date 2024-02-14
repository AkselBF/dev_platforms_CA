export const songSchema = {
  name: { type: String, required: true },
  length: { type: String, required: true },
  album: ObjectID 
};