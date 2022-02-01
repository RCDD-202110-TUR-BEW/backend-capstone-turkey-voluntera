const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    age: {
      type: Number,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    googleId: String,
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Post',
    },
    projects: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Project',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
const Volunteer = User.discriminator('Volunteer', volunteerSchema);
const Organization = User.discriminator('Organization', organizationSchema);

module.exports = { Volunteer, Organization };
