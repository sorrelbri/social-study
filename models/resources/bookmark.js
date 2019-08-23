const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Resource = require('./resource');

const BookmarkSchema = Resource.discriminator(
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
  
module.exports = BookmarkSchema;