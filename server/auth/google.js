// const passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth20').Strategy;

// const User = require('../models/user');
// var config = require('../config/auth');
// var init = require('./init');

// passport.use(new GoogleStrategy({
//     consumerKey: config.googleAuth.clientID,
//     consumerSecret: config.googleAuth.clientSecret,
//     callbackURL: config.googleAuth.callbackURL
//   },
//   // linkedin sends back the tokens and progile info
//   function(accessToken, refreshToken, profile, cb) {

//     var searchQuery = {
//       name: profile.displayName
//     };

//     var updates = {
//       name: profile.displayName,
//       someID: profile.id
//     };

//     var options = {
//       upsert: true
//     };

//     // update the user if s/he exists or add a new user
//     User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
//       if(err) {
//         return done(err);
//       } else {
//         return done(null, user);
//       }
//     });
//   }

// ));

// // serialize user into the session
// init();

// module.exports = passport;

var GoogleStrategy = require('passport-google-oauth20').Strategy;
console.log(GoogleStrategy);
const User = require('../models/User');

var passport = require('passport');
var configAuth = require('../config/auth');
console.log(configAuth.googleAuth.clientID);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;