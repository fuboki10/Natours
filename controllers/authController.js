const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  if (!newUser) {
    return res.status(400).json({
      status: 'fail',
      message: 'Enter Write Inputs'
    });
  }

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});