const Post = require('../models/post');

exports.addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.comments.push(req.body);
      await post.save();
      res.json(post);
    } else {
      res.status(422).json({ message: 'Unable the find post' });
    }
  } catch (err) {
    next(err);
  }
};

exports.getOneComment = async (req, res, next) => {
  const { postid, commentid } = req.params;

  try {
    const post = await Post.findById(postid);
    const comment = await post?.comments?.id(commentid);
    if (!comment) {
      res
        .status(422)
        .json({ message: "the comment you are looking for wasn't found" });
    } else {
      res.json(comment);
    }
  } catch (err) {
    next(err);
  }
};

exports.removeComment = async (req, res, next) => {
  const { postid, commentid } = req.params;

  try {
    const post = await Post.findById(postid);
    const comment = await post?.comments?.id(commentid);
    if (!comment) {
      res
        .status(422)
        .json({ message: "the comment you are looking for wasn't found" });
    } else {
      await comment.remove();
      await post.save();
      res.json(post);
    }
  } catch (err) {
    next(err);
  }
};
