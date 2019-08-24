const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ResourceModel = require('./resource');

const HighlightModel = ResourceModel.discriminator(
  'Highlight', 
  new Schema( 
    {}, 
  )
)

module.exports = HighlightModel;