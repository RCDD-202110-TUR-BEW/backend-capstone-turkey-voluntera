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
    date: {
      type: Date,
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
    date: {
      type: Date,
      required: true,
    },
    threads: [thread],
  },
  { timestamps: true }
);

const post = new mongoose.Schema(
  {
    PostID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
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
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    comments: [comment],
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', post);
