const mongoose = require('mongoose');
const { models } = require('../constants.json');

const threadCommentSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.user,
      required: true,
    },
    content: {
      type: String,
      maxlength: 1000,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.user,
      required: true,
    },
    content: {
      type: String,
      maxlength: 1000,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    thread: [threadCommentSchema],
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.user,
      required: true,
    },
    title: {
      type: String,
      maxlength: 100,
      required: true,
    },
    likes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: models.user,
          required: true,
        },
      ],
      default: [],
    },
    content: {
      type: String,
      maxlength: 2200,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

postSchema.virtual('numberOfLikes').get(function () {
  return this.likes.length;
});

postSchema.virtual('numberOfComments').get(function () {
  return this.comments.length;
});

commentSchema.virtual('numberOfThreadComments').get(function () {
  return this.thread.length;
});

module.exports = mongoose.model(models.post, postSchema);
