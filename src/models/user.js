const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    posts: [mongoose.Schema.Types.ObjectId],
    projects: [mongoose.Schema.Types.ObjectId],
  },

  { timestamps: true, discriminatorKey: 'userType' }
);

const volunteer = user.discriminator(
  'volunteer',
  new mongoose.Schema(
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
      },
    },
    { timestamps: true }
  )
);

const organization = user.discriminator(
  'organization',
  new mongoose.Schema(
    {
      Name: {
        type: String,
        required: true,
      },
      Description: {
        type: String,
      },
      Address: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = { user, volunteer, organization };
