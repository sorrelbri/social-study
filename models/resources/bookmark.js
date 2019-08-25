const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Resource = require('./resource');

const Bookmark = Resource.discriminator(
  'Bookmark', 
  new Schema({
    note: String,
  })
) 

module.exports = mongoose.model('Bookmark');