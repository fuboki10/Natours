const mongooose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

// name email photo password passwordConfirm

const userSchema = mongooose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name!'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter your email!'],
    unique: [true, 'This email is used!'],
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email!']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please enter your password!'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    select: false,
    validate: {
      // this only works on CREATE and SAVE!!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same'
    }
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(inputPassowrd) {
  return await bcrypt.compare(inputPassowrd, this.password);
};

userSchema.methods.generateAuthToken = async function() {
  return await jwt.sign({ id: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const User = mongooose.model('User', userSchema);

module.exports = User;
