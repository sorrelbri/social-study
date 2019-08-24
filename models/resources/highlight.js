const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ResourceModel = require('./resource');

const HighlightModel = ResourceModel.discriminator(
  'Bookmark', 
  new Schema( 
    {}, 
  )
)

module.exports = HighlightModel;