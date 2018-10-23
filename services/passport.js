const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(new GoogleStrategy(
  {
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: keys.GOOGLE_CLIENT_CALLBACK,
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
  },
));
