const bcrypt = require('bcrypt');
const { Volunteer, Organization } = require('../models/user');

exports.generalsignin = async (req, res) => {
  const { email, password } = req.body;

  const volunteer = await Volunteer.findOne({ email });
  const organization = await Organization.findOne({ email });

  let volunteerororganization = null;

  if (volunteer) {
    volunteerororganization = volunteer;
  } else if (organization) {
    volunteerororganization = organization;
  }

  if (!volunteerororganization) {
    return res
      .status(400)
      .render('user/signin', { error: 'Wrong username,email or password' });
  }

  const isValidPassword = await bcrypt.compare(
    password,
    volunteerororganization.passwordhash
  );
  if (!isValidPassword) {
    return res
      .status(400)
      .render('user/signin', { error: 'Wrong username,email or password' });
  }
  if (volunteer) {
    req.user = volunteer;
  } else if (organization) {
    req.user = organization;
  }
  res.setHeader('volunteer', volunteerororganization.id);
  return res.status(200).redirect('user/authenticated');
};

exports.volunteersignup = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    password2,
    birthdate,
    skills,
  } = req.body;

  if (password !== password2) {
    return res
      .status(400)
      .render('user/signupvolunteer', { error: 'passwords do not match' });
  }

  if (!birthdate) {
    return res
      .status(400)
      .render('user/signupvolunteer', { error: 'birthday missing' });
  }

  if (!skills) {
    return res
      .status(400)
      .render('user/signupvolunteer', { error: 'skills missing' });
  }

  const volunteer = await Volunteer.findOne({ email });
  if (volunteer) {
    return res.status(400).render('user/signup', {
      error: `${email}: there is already a volunteer with this email`,
    });
  }

  const passwordhash = await bcrypt.hash(password, 10);

  const newvolunteer = await Volunteer.create({
    firstname,
    lastname,
    username,
    email,
    birthdate,
    skills,
    passwordhash,
  });

  res.setHeader('volunteer', newvolunteer.id);
  req.user = newvolunteer;
  return res.status(200).redirect('user/authenticated');
};

exports.organizationsignup = async (req, res) => {
  const { name, email, description, password, password2, address } = req.body;

  if (password !== password2) {
    return res
      .status(400)
      .render('user/signuporganization', { error: 'passwords do not match' });
  }

  if (!description) {
    return res
      .status(400)
      .render('user/signuporganization', { error: 'description missing' });
  }

  if (!address) {
    return res
      .status(400)
      .render('user/signuporganization', { error: 'address missing' });
  }

  // User must not exist in the database for sign up request
  const organization = await Organization.findOne({ email });
  if (organization) {
    return res.status(400).render('user/signuporganization', {
      error: `${email}: there is already a organization with this email`,
    });
  }

  const passwordhash = await bcrypt.hash(password, 10);

  const neworganization = await Volunteer.create({
    name,
    email,
    description,
    address,
    passwordhash,
  });

  res.setHeader('organization', neworganization.id);
  req.user = neworganization;
  return res.status(200).redirect('user/authenticated');
};

exports.signout = async (req, res) => {
  res.setHeader('user', null);
  req.user = null;
  res.redirect('/');
};

exports.authenticated = async (req, res) => {
  res.render('user/authenticated');
};
