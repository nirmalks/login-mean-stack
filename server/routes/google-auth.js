const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passportGoogle = require('../auth/google');

router.get('/google',
  passportGoogle.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;