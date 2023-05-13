const http = require("http");
const express = require("express");
const socketio = require("socket.io");
require("dotenv").config();
const { UserModel } = require("./models/user.model")
const { UserRouter } = require("./routes/user.routes");
const passport = require("passport");
// const googleStrategy = require("passport-google-oauth20").Strategy

// const {passport}=require("./oauth(google)");
const redis = require("redis");
const app = express();
const { v4: uuidv4 } = require("uuid");
const { githubRouter } = require("./Oauth/github")
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// Render All Users

app.use(cookieParser());

const cors = require("cors")
const { connection } = require("./configs/db");
const { questionRouter } = require("./Router/question.router");
const { formatmessage } = require("./utils/message")
const { userjoin, getcurrentuser, userleave, getroomusers } = require("./utils/users")
app.use(cors());

// app.use(cookieParser());
app.use(express.json())
const httpServer = http.createServer(app);

app.use(express.static(__dirname + '/frontend'));


//redis
const redisClient = redis.createClient({
    url: `redis://default:XBQ8RCOsTH2LhM1C3qirvUdY3cjx4U6j@redis-11492.c301.ap-south-1-1.ec2.cloud.redislabs.com:11492`
})

redisClient.on('error', (err) => { console.log(err.message) });
(async () => await redisClient.connect())();
redisClient.on("ready", () => { console.log("connected to Redis"); });


app.use("/user", UserRouter);
app.use("/github", githubRouter);
app.use("/question", questionRouter)


var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    callbackURL: "http://localhost:2000/user/auth/google/callback"
},
    async function  (accessToken, refreshToken, profile, cb) {
        let name =profile._json.name;
        let email = profile._json.email;
        let verified = profile._json.email_verified;
        if(verified){
            let user = await UserModel.findOne({email:email});
            if(user){
                return cb(null,user)
            }
            let newUser = new UserModel({name:name,email:email,password:uuidv4()});
            await newUser.save();
            return cb(null,newUser);
        }
    
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
    }
));



app.get('/user/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/user/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login',session:false }),
    function (req, res) {
        let user = req.user;
        console.log(user);
        res.redirect("https://astounding-tarsier-f5de8a.netlify.app/")
        // Successful authentication, redirect home.
        // res.redirect('/');
    });




// ------------------ Google auth ends-----------------------

// ----------------

// -------------------- gihub authentication starts  -------------------------
app.get("/auth/github", async (req, res) => {
    const { code } = req.query;
    try {
        const token = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            }),
        }).then((res) => res.json());
        let Atoken = token.access_token;
        const userDetails = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${Atoken}`,
            },
        }).then((res) => res.json());
        console.log(userDetails);
        // send the token to the frontend (email is needed because we are using email to authenticate the user to the protected routes)
        const { login, name } = userDetails;
        const user = {
            name,
            email: `${login}@gmail.com`,
            password: uuidv4(),
        };
        console.log(user);
        const isUserpresent = await UserModel.find({ email: user.emailemail });
        console.log(isUserpresent + "data");
        if (isUserpresent) {
            console.log("hero");
            res.redirect("https://astounding-tarsier-f5de8a.netlify.app/")
        } else {
            const userData = new UserModel({ name: user.name, email: user.email, password: user.password });
            await userData.save();
            const tosendtoken = jwt.sign(
                { email: user.email },
                process.env.secret,
                {
                    expiresIn: "7h",
                }
            );
            res.redirect("https://astounding-tarsier-f5de8a.netlify.app/")
            // save the user details in the database here
            // res.send({
            //     msg: "Github authentication successful!",
            //     token: tosendtoken,
            //     user,
            // });

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong" });
    }
});




httpServer.listen(2000, async () => {
    try {
        await connection
        console.log("Connected to the DataBase")
    } catch (error) {
        console.log("Error While Making connection to Database", error)
    }
    console.log("Connected to server");
})