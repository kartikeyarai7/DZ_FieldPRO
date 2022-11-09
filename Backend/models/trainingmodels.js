const mongoose = require('mongoose');

const TrainingSchema = new mongoose.Schema({
  projectNumber: {
    type: String,
    required: false
  },
  salesOrder: {
    type: String,
    required: false
  },
  projectId: {
    type: String,
    required: false
  },
  segment: {
    type: String,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  pCount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required: false
  },
  accReq: {
    type: Boolean,
    required: true
  },
  transReq: {
    type: Boolean,
    required: true
  },
  confirmationStatus: {
    type: Boolean,
    required: true
  },
  trainer: {
    type: String,
    required: false
  },
  cost: {
    type: String,
    required: false
  },
  pData: {
    type: Array,
    required: true
  }
});

const Training = mongoose.model('Training', TrainingSchema);

module.exports = Training;
