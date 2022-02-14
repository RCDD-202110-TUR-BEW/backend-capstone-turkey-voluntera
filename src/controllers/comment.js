const Post = require('../models/post');

exports.addComment = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.comments.push(req.body);
  await post.save();
  return res.json(post);
};

exports.getOneComment = async (req, res) => {
  const { postid } = req.params;
  const { commentid } = req.query;

  try {
    const post = await Post.findById(postid);
    const comment = await post.comments.id(commentid);
    if (!comment) {
      res
        .status(422)
        .json({ message: "the comment you are looking for wasn't found" });
    } else {
      res.json(comment);
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

exports.removeComment = async (req, res) => {
  const { postid } = req.params;
  const { commentid } = req.query;

  try {
    const post = await Post.findById(postid);
    const comment = await post.comments.id(commentid);
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
    res.status(422).json({ message: err.message });
  }
};
