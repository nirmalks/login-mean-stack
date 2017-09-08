const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/authenticate', authController.authenticate);

module.exports = router;