const Resource = require('../../models/resources/resource');
const Bookmark = require('../../models/resources/bookmark');

module.exports = {
  showNotifications,
  showTrees,
  showBookmarks
}

function showNotifications(req, res, next) {
  
}

function showTrees(req, res, next) {
  
}

function showBookmarks(req, res, next) {
  Bookmark.find({user: req.user.id})
  .then(bookmarks => res.status(200).json(bookmarks))
  .catch(err => res.json(err));
}