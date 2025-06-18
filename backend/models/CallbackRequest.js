const mongoose = require('mongoose');

const callbackRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  enquiryFor: {
    type: String,
    required: true,
    enum: ['Online Courses (Website)', 'Offline Courses', 'Career Counseling', 'Other'],
    default: 'Online Courses (Website)'
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Resolved'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CallbackRequest = mongoose.model('CallbackRequest', callbackRequestSchema);

module.exports = CallbackRequest; 