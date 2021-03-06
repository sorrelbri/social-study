const Lesson = require('../../models/lesson');
const Comment = require('../../models/resources/comment');

module.exports = {
  delete: deleteComment,
  create
};

function deleteComment(req, res, next) {
  Comment.findById(req.params.id)
  .then(comment => {
    if (String(comment.user._id) !== String(req.user.id)) return;
    comment.remove()
    .then(() => res.status(204))
  })
}

function create(req, res, next) {
  Lesson.findById(req.params.id)
  .then(lesson => {
    Comment.create({
      note: req.body.note,
      lesson: lesson._id,
      position: req.params.pos,
      public: req.body.public === 'checked' ? true : false,
      content: req.body.content,
      user: req.user
    })
    .then(newComment => {
      console.log(newComment);
      req.user.bookmarks.push(newComment._id);
    })
    .then(() => {
      res.status(201).json(lesson._id);
    })
  })
}