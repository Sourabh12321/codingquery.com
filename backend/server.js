//const express=require("express");
//require("dotenv").config();
// const {connection}=require("./configs/db");
// const redis=require("redis");
// const cors=require("cors");

//const app=express();
//app.use(cors());
// const {UserRouter}=require("./routes/user.routes");
// const {passport}=require("./oauth(google)");
// const { authentication } = require("./middlewares/authentication");

// const redisClient = redis.createClient({
//     url:`redis://default:XBQ8RCOsTH2LhM1C3qirvUdY3cjx4U6j@redis-11492.c301.ap-south-1-1.ec2.cloud.redislabs.com:11492`
// })

// redisClient.on('error',(err)=>{console.log(err.message)});
// (async()=>await redisClient.connect())();
// redisClient.on("ready",()=>{console.log("connected to Redis");});


//app.use(express.json());

// app.use("/user",UserRouter);

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile','email'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', {
//      successRedirect:"https://www.facebook.com",
//      failureRedirect: '/login',
//      session:false
//      }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     console.log(req.user);
//     res.redirect('/');
//   });


//app.use(authentication)

// app.get("/",(req,res)=>{
//     res.sendFile(__dirname+"/index.html");
// })

// app.get("/home",authentication,(req,res)=>{
//     console.log("getting",req.body);
//     res.send("home page");
// })


// app.listen(1700,async (req,res)=>{
//     try{
//         await connection
//         console.log(`The server is running at 1700 `);
//     }
//     catch(err){
//         console.log(err.message);
//     }
   
// })