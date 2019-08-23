const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Lesson = require('./lesson');

const TreeSchema = new Schema({
  name: String,
  url: String,
  childTrees: [{
    type: Schema.Types.ObjectId,
    ref: 'Tree'
  }],
  childLessons: [{
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  }]
},
  { timestamps: true }
)

module.exports = mongoose.Model('Tree', TreeSchema)