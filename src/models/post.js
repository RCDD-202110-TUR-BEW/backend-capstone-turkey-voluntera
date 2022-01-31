const mongoose = require('mongoose');

const thread = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const comment = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    threads: [thread],
  },

  { timestamps: true }
);

const post = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    content: {
      type: String,
      required: true,
    },
    comments: [comment],
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', post);
