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
  Tree.find({})
    .then(trees => trees.forEach(tree => tree
      .populate('childLessons')
      .then(tree => tree
        .populate('childTrees'))))
    .then(results => res.status(200).json(results))
    .catch(err => res.json(err));
}

function showBookmarks(req, res, next) {
  Bookmark.find({user: req.user.id})
  .then(bookmarks => res.status(200).json(bookmarks))
  .catch(err => res.json(err));
}