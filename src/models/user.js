const mongoose = require('mongoose');

const organization = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, discriminatorKey: 'organization' }
);

const volunteer = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    Skills: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true, discriminatorKey: 'volunteer' }
);

const user = new mongoose.Schema(
  {
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [mongoose.Schema.Types.ObjectId],
    projects: [mongoose.Schema.Types.ObjectId],
    _t: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', user);
