const handleErrors = (err, req, res, next) => {
  //  Add logger when it's merged
  res.status(500).json({ message: 'Server ran into an error', err });
};

module.exports = handleErrors;
