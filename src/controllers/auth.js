exports.callback = async (req, res) => {
  res.json(req.user);
};

exports.signout = (req, res) => {
  const { id } = req.user;
  req.logout();
  res.json({ user: id, message: 'Successfuly logged out' });
};
