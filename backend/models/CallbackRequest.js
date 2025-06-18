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
    enum: ['Online Courses (Website)', 'Offline Courses', 'Career Counseling', 'Corporate Training', 'Other'],
    default: 'Online Courses (Website)'
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Resolved'],
    default: 'Pending'
  },
  isViewed: {
    type: Boolean,
    default: false
  },
  viewedAt: {
    type: Date,
    default: null
  },
  deleteAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add a TTL index to automatically delete documents after deleteAt
callbackRequestSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });

const CallbackRequest = mongoose.model('CallbackRequest', callbackRequestSchema);

module.exports = CallbackRequest; 