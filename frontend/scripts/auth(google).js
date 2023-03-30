const express=require("express");
const {UserModel}=require("./models/user.model");
require("dotenv").config();
const {connection}=require("./configs/db");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const app=express();

const {passport}=require("./oauth");

app.use(express.json());


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



// it is the register route
app.post("/register",async(req,res)=>{
    let user=req.body;

    try{
        let findUser=await UserModel.findOne({"email":user.email});
        if(findUser){
           return res.send("the user is already registered");
        }

        bcrypt.hash(user.password,6,async(err,hash)=>{
            if(err) return res.send("something went wrong");
            else{
                user.password=hash;

                user=new UserModel(user);
                await user.save();
                res.send("The user user has now been registered");
            }
        })
    }
    catch(err){
         res.send(err.message);
    }
})



//the login route
app.post("/login",async(req,res)=>{
    try{
        let user=req.body;

        let findUser=await UserModel.findOne({"email":user.email});

        if(!findUser){
            res.send("user not registered");
        }

        bcrypt.compare(findUser.password, user.password, async(err,decoded)=>{
            if(err) {
                res.send("wrong password entered");
            }
            let token=jwt.sign({userid:findUser._id}, process.env.token, {expiresIn:100});

            let refreshToken=jwt.sign({userid:findUser._id},process.env.refreshToken, {expiresIn:400})

            //await redisclient.setEx("token",100,token);
             
            //await redisclient.setEx("refreshToken",400,refreshToken);
            res.send("the user has been logged in ")

        })
    }
    catch(err){
        res.send({"error":err.message});
    }
})




app.get("/",(req,res)=>{
    res.send("this is the main page");
})


app.listen(1700,async (req,res)=>{
    try{
        await connection
        console.log(`The server is running at 1700 `);
    }
    catch(err){
        console.log(err.message);
    }
   
})