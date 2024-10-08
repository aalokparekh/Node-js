const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  director: String,
  releaseYear: Number,
  description: String
});

module.exports = mongoose.model('Movie', movieSchema);
