const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  startWeek: {
    type: String,
    required: true
  },
  endWeek: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: false
  },
  endDate: {
    type: String,
    required: false
  },
  dayOfWeek: {
    type: String,
    required: false
  },
  duration: {
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
  rCount: {
    type: String,
    required: true
  },
  resources: {
    type: Array,
    required: false
  },
  status: {
    type: String,
    required: false
  }
});

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;
