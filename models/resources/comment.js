const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ResourceSchema = require('./resource');

const CommentModel = Resource.discriminator(
  'Comment', 
  new Schema({
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    },
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
  }
  )
)

module.exports = CommentModel;