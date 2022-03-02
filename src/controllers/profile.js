const { User } = require('../models/user');

exports.getOneProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res
        .status(422)
        .json({ message: "the user you are looking for wasn't found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

exports.filterProfiles = async (req, res, next) => {
  const { username, email } = req.query;
  if (!username && !email) {
    res
      .status(400)
      .json({ message: 'make sure you send a valid query parameter' });
  } else {
    const query = {};
    if (username) query.username = username;
    if (email) query.email = email;
    try {
      const users = await User.find(query);
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
};

exports.updateProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res
        .status(422)
        .json({ message: "the user you are trying to update wasn't found" });
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.json({ message: 'Successfully deleted' });
    } else {
      res.status(422).json({ message: 'Could not find user' });
    }
  } catch (err) {
    next(err);
  }
};
