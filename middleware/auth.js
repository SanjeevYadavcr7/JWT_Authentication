// to use protected routes

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Bearer 4dgay567e1e16e1e3ed
    // splitting to get token out of auth headers
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ErrorResponse('Unauthorized access!', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user)
      return next(new ErrorResponse('No user found with this Id', 404));
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse('Error in protected routes', 401));
  }
};
