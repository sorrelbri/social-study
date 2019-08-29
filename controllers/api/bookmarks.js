const Lesson = require('../../models/lesson');
const Bookmark = require('../../models/resources/bookmark');

module.exports = {
  edit,
  create
}

function edit(req, res, next) {
  Bookmark.findByIdAndUpdate(req.params.id, req.body)
  .then(() => res.status(200))
}

function create(req, res, next) {
  Lesson.findById(req.body.lesson)
  .then(lesson => {
    Bookmark.create({
      note: req.body.note,
      lesson: lesson._id,
      position: req.body.position,
      user: req.user
    })
    .then(newBookmark => {
      req.user.bookmarks.push(newBookmark._id);
    })
    .then(() => {
      res.status(201);
    })
  })
}
