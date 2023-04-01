const GoogleStrategy = require('passport-google-oauth20').Strategy;

const passport=require("passport");

//importing uuid
// const { v4: uuidv4 } = require('uuid');

// const { UserModel } = require('./models/user.model');

require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    callbackURL: "http://localhost:1700/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    // let email=profile._json.email;
    //  const user=new UserModel({
    //   email,
    //   password: uuidv4()
    //  })
    //  await user.save()

     //in the return callback ,we can pass details like email, name etc which we will get when the login is made by the user.
     return cb(null,"random text");
    //console.log(profile);
  }
));



module.exports={
    passport
}