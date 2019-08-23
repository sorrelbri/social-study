const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bookmark = require('./resources/bookmark');

const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
  bookmarks: [{
    type: Schema.Types.ObjectId,
    ref: 'Bookmark'
  }],
  commments: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('User', userSchema);