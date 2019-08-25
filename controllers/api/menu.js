const Lesson = require('../../models/lesson');
const Resource = require('../../models/resources/resource');
const Tree = require('../../models/tree');

module.exports = {
  show
}

function show(req, res, next) {
  //! refactor to Tree.find({}).populate('Lesson').populate('Tree')
  Lesson.find({})
  .then(lessons => {
    Resource.find({user: req.user})
    .populate('lesson')
    .then(resources => {
      let payload = { lessons, resources, user: req.user };
      return res.status(200).json(payload);
    })
  })
  .catch(err => res.status(500).json(err));
}