const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ResourceModel = require('./resource');

const HighlightSchema = ResourceModel.discriminator(
  'Bookmark', 
  new Schema( 
    {}, 
  )
)

module.exports = HighlightModel;