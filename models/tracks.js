const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  TrackId: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  AlbumId: {
    type: Number,
    required: true,
  },
  GenreId: {
    type: Number,
    required: true,
  },
  Composer: {
    type: String,
    required: true,
    trim: true,
  },
  Milliseconds: {
    type: Number,
  },
  Bytes: {
    type: Number,
  },
  UnitPrice: {
    type: Number,
    required: true,
  },
});

const Track = mongoose.model('Track', trackSchema);

module.exports = { Track };
