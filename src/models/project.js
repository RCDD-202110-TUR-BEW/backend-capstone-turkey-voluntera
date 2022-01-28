const mongoose = require('mongoose');

const application = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const project = new mongoose.Schema(
  {
    ProjectID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
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
      required: true,
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
    },
    necessarySkills: {
      type: [String],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    applications: [application],
  },
  { timestamps: true }
);

module.exports = mongoose.model('project', project);
