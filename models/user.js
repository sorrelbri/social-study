const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookmarkSchema = require('./resources/bookmark');

const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
  bookmarks: [BookmarkSchema],
  commments: {
    type: mongoose.Types.ObjectId,
    ref: 'Comment'
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('User', userSchema);