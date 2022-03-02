const Post = require('../models/post');

exports.getAllPosts = async (_, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getOnePost = async (req, res, next) => {
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
    next(err);
  }
};

exports.addPost = async (req, res, next) => {
  const postData = req.body;
  try {
    const newPost = await Post.create(postData);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

exports.filterPosts = async (req, res, next) => {
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
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }
};

exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPost) {
      res
        .status(422)
        .json({ message: "the post you are trying to update wasn't found" });
    } else {
      res.json(updatedPost);
    }
  } catch (err) {
    next(err);
  }
};

exports.removePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (deletedPost) {
      res.json({ message: 'Successfuly deleted the post' });
    } else {
      res.json(422).json({ message: 'Could not find post' });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateLikes = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json('Could not found user in request body');
  } else {
    try {
      const post = await Post.findById(id);
      if (!post) {
        res
          .status(422)
          .json({ message: "The post you are looking for wasn't found" });
      } else {
        post.likes.push(userId);
        await post.save();
        res.json({ likes: post.likes });
      }
    } catch (err) {
      next(err);
    }
  }
};
