const atob = require('atob');
const Lesson = require('../../models/lesson');
const Resource = require('../../models/resources/resource');

module.exports = {
  show
}

function show(req, res, next) {
  Lesson.findById(req.params.id)
  .then(lesson => {
    //TODO filter based on user + public
    Resource.find( { lesson: lesson._id })
    .then(resources => {
      let payload = { lesson, resources, user: req.user };
      return res.status(200).json(payload);
    })
  })
  .catch(err => res.status(500).json(err));
}
