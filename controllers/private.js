exports.getrPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'Accessing Private Route!',
  });
};
