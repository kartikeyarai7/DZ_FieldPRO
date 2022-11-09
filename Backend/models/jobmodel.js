const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
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
  product: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  lead: {
    type: String,
    required: false
  },
  rCount: {
    type: String,
    required: true
  },
  resources: {
    type: Array,
    required: false
  },
  planId: {
    type: String,
    required: false
  },
  comments: {
    type: String,
    required: false
  }
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
