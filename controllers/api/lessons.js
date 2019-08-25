const atob = require('atob');
const Lesson = require('../../models/lesson');

module.exports = {
  show
}

function show(req, res, next) {
  Lesson.findById(req.params.id)
  .then(result => {
    return res.status(200).json(result.content);
  })
  .catch(err => res.status(500).json(err));
}
