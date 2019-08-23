const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ResourceSchema = require('./resource');

const HighlightSchema = new Schema({
  }, { timestamps: true }
)

module.exports = HighlightSchema;