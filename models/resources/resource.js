const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  position: String,
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  }
},
  { discriminatorKey: 'resource', collection: 'resources', timestamps: true }
)

module.exports = mongoose.model('Resource', ResourceSchema);