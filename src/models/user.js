const mongoose = require('mongoose');
const { models } = require('../constants.json');

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true,
    },
    description: {
      type: String,
      maxlength: 2200,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const volunteerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
    },
    skills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      maxlength: 25,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    googleId: String,
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
    },
    posts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: models.post,
        },
      ],
      default: [],
    },
    projects: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: models.project,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'userType',
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.virtual('age').get(function () {
  if (this.userType === 'Volunteer') {
    const today = new Date();
    const { birthDate } = this;

    const diff = today.getTime() - birthDate.getTime();
    // convert ms to year and return
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }
  return { err: 'This is an organization and does not have an age value' };
});

userSchema.virtual('numberOfPosts').get(function () {
  return this.posts.length;
});

userSchema.virtual('numberOfProjects').get(function () {
  return this.projects.length;
});

const User = mongoose.model(models.user, userSchema);
const Volunteer = User.discriminator(models.volunteer, volunteerSchema);
const Organization = User.discriminator(
  models.organization,
  organizationSchema
);

module.exports = { Volunteer, Organization, User };
