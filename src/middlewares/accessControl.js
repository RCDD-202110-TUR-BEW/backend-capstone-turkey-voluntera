const { User } = require('../models/user');

const isAdmin = async (req, res, next) => {
  try {
    const user = User.findById(req.user.id);
    if (user.role === 'admin') {
      next();
    } else {
      res.status(400).json({
        status: 'Fail',
        message: 'You are trying to access an admin route',
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = User.findById(req.user.id);
    if (user.role === 'admin' || user.role === 'moderator') {
      next();
    } else {
      res.status(400).json({
        status: 'Fail',
        message: 'You are trying to access a moderator route',
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { isAdmin, isModerator };
