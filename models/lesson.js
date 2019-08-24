const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HighlightSchema = require('./resources/highlight');

const LessonSchema = new Schema({
  name: String,
  url: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  highlights: [{
    type: Schema.Types.ObjectId,
    ref: 'Highlight'
  }]
},
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', LessonSchema);