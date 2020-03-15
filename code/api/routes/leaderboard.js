const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

router.route('/').get(UserController.getLeaderboard);

module.exports = router;
