const Lesson = require('../../models/lesson');
const Bookmark = require('../../models/resources/bookmark');

module.exports = {
  create
}

function create(req, res, next) {
  Lesson.findById(req.params.id)
  .next(lesson => {
    Bookmark.create({
      note: req.body.note,
      lesson: lesson._id,
      // position: req.params.pos
    })
  })
  .next(newBookmark => {
    req.user.bookmarks.push(newBookmark._id);
  })
  .next(() => {
    res.status(200)
  })
}