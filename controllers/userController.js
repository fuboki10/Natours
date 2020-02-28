const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const filterObj = require('../utils/filterObj');
const factory = require('./handlerFactory');

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndRemove(req.user.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for password updates. Please use /me/updatePassword',
        400
      )
    );
  // update user document
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser
    }
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);