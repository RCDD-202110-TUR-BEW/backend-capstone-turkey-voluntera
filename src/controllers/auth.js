const bcrypt = require('bcrypt');
const { Volunteer, Organization } = require('../models/user');

const signup = async (req, res, next, UserModel) => {
  const { password } = req.body;
  try {
    req.body.password = await bcrypt.hash(password, 10);
    const user = await UserModel.create(req.body);

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res
        .status(200)
        .json({ status: 'ok', message: 'Successfuly signed up new user' });
    });
  } catch (err) {
    next(err);
  }
};

exports.callback = async (req, res) => {
  res.json(req.user);
};

exports.volunteerSignup = async (req, res, next) => {
  signup(req, res, next, Volunteer);
};

exports.organizationSignup = async (req, res, next) => {
  signup(req, res, next, Organization);
};

exports.signout = (req, res, next) => {
  const { id } = req.user;
  req.logout();
  req.session.destroy();
  res.json({ user: id, message: 'Successfuly logged out' });
};
