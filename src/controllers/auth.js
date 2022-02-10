const bcrypt = require('bcrypt');
const { Volunteer, Organization } = require('../models/user');

exports.generalsignin = async (req, res) => {
  const { email, password } = req.body;

  const volunteer = await Volunteer.findOne({ email });
  const organization = await Organization.findOne({ email });

  const volunteerpassword = await Volunteer.findOne({ password });
  const organizationpassword = await Organization.findOne({ password });

  let volunteerororganization = null;

  if (volunteer && volunteerpassword) {
    volunteerororganization = volunteer;
  } else if (organization && organizationpassword) {
    volunteerororganization = organization;
  }

  if (!volunteerororganization) {
    return res.status(400).json({ error: 'Wrong username,email or password' });
  }

  const isValidPassword = await bcrypt.compare(
    password,
    volunteerororganization.passwordhash
  );
  if (!isValidPassword) {
    return res.status(400).json({ error: 'Wrong username,email or password' });
  }
  if (volunteer) {
    req.user = volunteer;
  } else if (organization) {
    req.user = organization;
  }
  res.setHeader('user', volunteerororganization.id);
  return res.status(200).json({
    // eslint-disable-next-line no-underscore-dangle
    organizationid: volunteerororganization._id,
    message: `${req.user} signup is successfull.`,
  });
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
    return res.status(400).json({ error: 'passwords do not match' });
  }

  if (!birthdate) {
    return res.status(400).json({ error: 'birthday missing' });
  }

  if (!skills) {
    return res.status(400).json({ error: 'skills missing' });
  }

  const volunteer = await Volunteer.findOne({ email });
  if (volunteer) {
    return res.status(400).json({
      error: `${email}: there is already a volunteer with this email`,
    });
  }

  const organization = await Organization.findOne({ email });
  const organizationpassword = await Organization.findOne({ password });
  if (volunteer && organizationpassword === password) {
    return res.status(400).json({
      error: `${email}: you have other account with this email as a organization. You need to come up with a different password if you want to use the same email.`,
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

  res.setHeader('user', newvolunteer.id);
  req.user = newvolunteer;
  return res.status(200).json({
    // eslint-disable-next-line no-underscore-dangle
    volunteerid: newvolunteer._id,
    message: 'Volunteer is successfully created.',
  });
};

exports.organizationsignup = async (req, res) => {
  const { name, email, description, password, password2, address } = req.body;
  // console.log(req.body);

  if (!password || password !== password2) {
    return res.status(400).json({ error: 'passwords do not match' });
  }

  if (!description) {
    return res.status(400).json({ error: 'description missing' });
  }

  if (!address) {
    return res.status(400).json({ error: 'address missing' });
  }
  const volunteer = await Volunteer.findOne({ email });
  const volunteerpassword = await Volunteer.findOne({ password });
  if (volunteer && volunteerpassword === password) {
    return res.status(400).json({
      error: `${email}: you have other account with this email as a volunteer. You need to come up with a different password if you want to use the same email.`,
    });
  }
  // User must not exist in the database for sign up request
  const organization = await Organization.findOne({ email });
  if (organization) {
    return res.status(400).json({
      error: `${email}: there is already an organization with this email`,
    });
  }

  const passwordhash = await bcrypt.hash(password, 10);

  const neworganization = await Organization.create({
    name,
    email,
    description,
    address,
    passwordhash,
  });

  res.setHeader('user', neworganization.id);
  req.user = neworganization;
  return res.status(200).json({
    // eslint-disable-next-line no-underscore-dangle
    organizationid: neworganization._id,
    message: 'Organization is successfully created.',
  });
};

exports.signout = async (req, res) => {
  res.setHeader('user', null);
  req.user = null;
  return res.status(200).json({ message: 'Successfuly logged out' });
};

exports.authenticated = async (req, res) => {
  // res.render('user/authenticated');
};
