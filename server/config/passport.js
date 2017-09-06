const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

let User = require('../app/models/user');
const passport = require('passport');
const configAuth = require('./auth');

passport.use(new GoogleStrategy({
    clientID: configAuth.clientID,
    clientSecret: configAuth.clientSecret,
    callbackURL: configAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = passport;