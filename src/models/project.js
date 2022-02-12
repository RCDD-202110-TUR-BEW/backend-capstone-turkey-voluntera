const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: String,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    necessarySkills: {
      type: [String],
    },
    date: {
      type: Date,
      required: true,
    },
    applications: [applicationSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
