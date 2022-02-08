const mongoose = require('mongoose');
const { models } = require('../constants.json');

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.user,
      required: true,
    },
    date: {
      type: Date,
      required: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: models.user,
      required: true,
    },
    title: {
      type: String,
      maxlength: 100,
      required: true,
    },
    type: {
      type: String,
      enum: ['Event', 'Part-time', 'Full-time'],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    necessarySkills: {
      type: [String],
      default: [],
    },
    date: {
      type: Date,
      required: true,
    },
    applications: {
      type: [applicationSchema],
      default: [],
    },
  },
  { timestamps: true }
);

projectSchema.virtual('numberOfApplications').get(function () {
  return this.applications.length;
});

module.exports = mongoose.model(models.project, projectSchema);
