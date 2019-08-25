const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Resource = require('./resource');

const Comment = Resource.discriminator(
  'Comment', 
  new Schema({
    note: String,
    public: Boolean,
    content: String,
    childComment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  })
)

module.exports = mongoose.model('Comment');