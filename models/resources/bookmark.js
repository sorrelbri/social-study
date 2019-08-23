const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ResourceSchema = require('./resource');

const BookmarkSchema = new ResourceSchema({
  // ResourceSchema,
  name: String,
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  }
})

module.exports = BookmarkSchema;