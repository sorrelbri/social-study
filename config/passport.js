const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }, (accessToken, refreshToken, profile, cb) => {
    User.findOne( { googleId: profile.id }, (err, user) => {
      if (err) return cb(err);
      if (user) {
        return cb(err, user);
      } else {
        let newUser = new user({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          avatar: profile.photos[0].value
        });
        newUser.save(err => {
          return cb(err, newUser);
        });
      }
    });
  }
));

passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => cb(err, user));
});