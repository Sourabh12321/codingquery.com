const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport");

require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    callbackURL: "http://localhost:2000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });

    console.log(profile);
    return cb(null,'user')
  }
));


module.exports={
    passport
}