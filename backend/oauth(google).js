// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require("dotenv").config()
// const {userModel}=require("./models/user.model");
// const { v4: uuidv4 } = require('uuid');
// const passport=require("passport")

// passport.use(new GoogleStrategy({
//     clientID: process.env.google_client_id,
//     clientSecret: process.env.google_client_secret,
//     callbackURL: "http://localhost:2000/googleauth/auth/google/callback"
//   },
//  async function(accessToken, refreshToken, profile, cb) {
//     let email=profile._json.email
//     let name=profile._json.name
//     const user=new userModel({
//         name,email,password:uuidv4()

//     })
//     await user.save()
//     return cb(null,user)
//     //console.log(profile)
//   }
// ));

// module.exports={
//     passport
// }