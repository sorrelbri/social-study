const Lesson = require('../../models/lesson');
const Bookmark = require('../../models/resources/bookmark');

module.exports = {
  create
}

function create(req, res, next) {
  Lesson.findById(req.params.id)
  .then(lesson => {
    Bookmark.create({
      note: req.body.note,
      lesson: lesson._id,
      position: req.params.pos
    })
    .then(newBookmark => {
      req.user.bookmarks.push(newBookmark._id);
    })
    .then(() => {
      res.status(200)
    })
  })
}
