const Lesson = require('../../models/lesson');
const Highlight = require('../../models/resources/highlight');

module.exports = {
  create
}

function create(req, res, next) {
  Lesson.findById(req.params.id)
  .then(lesson => {
    Highlight.create({
      lesson: lesson._id,
      position: req.params.pos,
    })
    .then(newHighlight => {
      console.log(newHighlight);
      req.user.bookmarks.push(newHighlight._id);
    })
    .then(() => {
      res.status(200)
    })
  })
}