const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

router
  .route('/')
  .get(UserController.getUserDetails)
  .post(UserController.updateUserDetails);

router.route('/stats').get(UserController.getUserStats);

// router
//   .route('/:id')
//   .put(UserController.updateTag)
//   .delete(UserController.deleteTag);

module.exports = router;
