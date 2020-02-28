const express = require('express');
const userController = require('./../controllers/userController.js');
const authController = require('./../controllers/authController.js');

const router = express.Router();

router.get('/me', authController.protect, userController.getMe, userController.getUser);
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.post(
  '/me/updatePassword',
  authController.protect,
  authController.updatePassword
);
router.post('/me/update', authController.protect, userController.updateMe);
router.delete('/me/delete', authController.protect, userController.deleteMe);


// Only For ADMINS
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(authController.protect, userController.createUser);

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

module.exports = router;