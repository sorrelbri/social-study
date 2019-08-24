const request = require('request');

module.exports = {
  show
}

function show(req, res, next) {
  Lesson.findById(req.params.id)
  .then()
}
