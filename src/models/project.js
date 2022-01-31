const mongoose = require('mongoose');

const application = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      required: true,
      default: 'pending',
    },
  },
  { timestamps: true }
);

const project = new mongoose.Schema(
  {
    Creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isOpen: {
      type: String,
      required: true,
      enum: ['open', 'closed'],
      default: 'open',
    },
    necessarySkills: {
      type: [String],
    },
    applications: [application],
  },
  { timestamps: true }
);

module.exports = mongoose.model('project', project);
