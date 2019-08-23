const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  position: String
},
  { timestamps: true, discriminatorKey: 'resource', collection: 'resources' }
)

module.exports = mongoose.model('Resource', ResourceSchema);