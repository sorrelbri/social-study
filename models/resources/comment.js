const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ResourceSchema = require('./resource');

const CommentSchema = new ResourceSchema({
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  },
  public: Boolean,
  content: String,
  childComment: CommentSchema,
  parentComment: CommentSchema
  }
)

module.exports = mongoose.model('Comment', CommentSchema);