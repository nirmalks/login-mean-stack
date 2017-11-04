var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

var passport = require('passport');
var configAuth = require('../config/auth');

passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    User.findOne({ externalId: profile.id }, function (err, user) {

      if(user === null) {
        var user = new User();
        user.externalId = profile.id,
        user.externalType = "google"; 
        user.save();
      }
      return cb(err, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;