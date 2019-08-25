const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Resource = require('./resource');

const Bookmark = Resource.discriminator(
  'Bookmark', 
  new Schema({
    // Resource,
    name: String,
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    }
  })
) 

module.exports = mongoose.model('Bookmark');