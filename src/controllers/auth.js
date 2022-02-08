exports.callback = async (req, res) => {
  res.json(req.user);
};
