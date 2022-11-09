const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  site: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = Resource;
