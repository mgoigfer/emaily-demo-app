const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(new GoogleStrategy(
  {
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: keys.GOOGLE_CLIENT_CALLBACK,
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({
      googleId: profile.id,
    });

    if (existingUser) {
      // We already have a record with the given profile ID.
      done(null, existingUser);
    } else {
      // We don't have a user record with this ID, so make a new record.
      const newUser = await new User({ googleId: profile.id }).save();
      done(null, newUser);
    }
  },
));
