const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  AlbumId: { type: Number, required: true },
  Title: { type: String, required: true, trim: true },
  ArtistId: { type: Number },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = { Album };
