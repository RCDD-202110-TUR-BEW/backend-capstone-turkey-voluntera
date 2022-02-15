const User = require('../models/user');

exports.getOneProfile = async (req, res) => {
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
    res.status(422).json({ message: err.message });
  }
};

exports.filterProfiles = async (req, res) => {
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
      if (users.length === 0) {
        res.status(422).json({ message: 'No users by these parameters' });
      } else {
        res.json(users);
      }
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      res
        .status(422)
        .json({ message: "the user you are trying to update wasn't found" });
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

exports.deleteProfile = (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(422);
      return res.json({ err: 'Not deleted' });
    }
    return res.status(204).send();
  });
};
