const Resource = require('../../models/resources/resource');
const Bookmark = require('../../models/resources/bookmark');
const Lesson = require('../../models/lesson');

module.exports = {
  showNotifications,
  showTrees: show,
  showBookmarks
}

function showNotifications(req, res, next) {

}

function showTrees(req, res, next) {
  Tree.findById({})
    .then(tree => (tree => tree
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

function show(req, res, next) {
  //! refactor to Tree.find({}).populate('Lesson').populate('Tree')
  Lesson.find({})
  .then(lessons => res.status(200).json(lessons))
  .catch(err => res.status(500).json(err));
}