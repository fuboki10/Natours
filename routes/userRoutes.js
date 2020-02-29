const express = require('express');
const userController = require('./../controllers/userController.js');
const authController = require('./../controllers/authController.js');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// All this routes are Protected
router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);

router.post(
  '/me/updatePassword',
  authController.updatePassword
);
router.post('/me/update', userController.updateMe);
router.delete('/me/delete', userController.deleteMe);


// Only For ADMINS
router.use(authController.restrictTo('admin'));

router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;