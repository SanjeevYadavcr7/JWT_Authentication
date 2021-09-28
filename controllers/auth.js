const { getMaxListeners } = require('../models/User');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorResponse('Please provide your email and password!', 400)
    );
  }
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new ErrorResponse('User not found!', 401));

    // matchPasswords() implemented in 'User' model
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) return next(new ErrorResponse('Invalid credentials!', 401));

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorResponse('Error while login!', 401));
  }
};

exports.forgotpassword = (req, res, next) => {
  res.send('forgotpassword route');
};

exports.resetpassword = (req, res, next) => {
  res.send('resetpassword route');
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
