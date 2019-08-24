const atob = require('atob');
const Lesson = require('../../models/lesson');

module.exports = {
  show
}

function show(req, res, next) {
  Lesson.findById(req.params.id)
  .then(result => {
    let payload = atob(result.content);
    return res.status(200).json(payload);
  })
  .catch(err => res.status(500).json(err));
}
