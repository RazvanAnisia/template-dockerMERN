const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

router
  .route('/')
  .get(UserController.getUserDetails)
  .post(UserController.updateUserDetails);

router.route('/stats').get(UserController.getUserStats);
router.route('/unregister').post(UserController.deleteUserAccount);

module.exports = router;
