const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth/signin');
  }
};

module.exports = { checkAuthentication };
