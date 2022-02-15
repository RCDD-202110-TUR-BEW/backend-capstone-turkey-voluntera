const Post = require('../models/post');

exports.getAllPosts = async (_, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

exports.getOnePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      res
        .status(422)
        .json({ message: "the post you are looking for wasn't found" });
    } else {
      res.json(post);
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

exports.addPost = async (req, res) => {
  const postData = req.body;
  try {
    const newPost = await Post.create(postData);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

exports.filterPosts = async (req, res) => {
  const { sender, title } = req.query;
  if (!sender && !title) {
    res
      .status(400)
      .json({ message: 'make sure you send a valid query parameter' });
  } else {
    const query = {};
    if (sender) query.sender = sender;
    if (title) query.title = title;
    try {
      const posts = await Post.find(query);
      if (posts.length === 0) {
        res.status(422).json({ message: 'No posts by these parameters' });
      } else {
        res.json(posts);
      }
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!updatedPost) {
      res
        .status(422)
        .json({ message: "the post you are trying to update wasn't found" });
    } else {
      res.json(updatedPost);
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

exports.removePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(422);
      return res.json({ err: 'Not deleted' });
    }
    return res.status(204).send();
  });
};

exports.updateLikes = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) {
      res
        .status(422)
        .json({ message: "The post you are looking for wasn't found" });
    } else {
      res.json({ likes: Post.likes });
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};
