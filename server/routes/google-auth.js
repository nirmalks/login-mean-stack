const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const passportGoogle = require('../config/passport');
const passportGoogle = require('../auth/google');
router.get('/google',
  passportGoogle.authenticate('google', { scope: ['profile' , 'email'] }));

router.get('/google/callback', 
  passportGoogle.authenticate('google', { failureRedirect: 'http://localhost:4200/login' }),
  function(req, res) {
    console.log(req);
    console.log(res);
    // Successful authentication, redirect home.
    res.redirect('http://localhost:4200');
  });

module.exports = router;