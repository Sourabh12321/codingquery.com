const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();


const {redisclient}=require("../configs/redis");
const {UserModel}=require("../models/user.model")
const UserRouter=express.Router();

const {authentication}=require("../middlewares/authentication");

// UserRouter.get("/",(req,res)=>{
//     res.jsonFile(__dirname+"/index.html");
// })


UserRouter.post("/register",async(req,res)=>{
    let user=req.body;

    try{
        let findUser=await UserModel.findOne({"email":user.email});
        if(findUser){
           return res.json("the user is already registered");
        }

        bcrypt.hash(user.password,6,async(err,hash)=>{
            if(err) return res.json("something went wrong");
            else{
                user.password=hash;

                user=new UserModel(user);
                await user.save();
                res.json("The user user has now been registered");
            }
        })
    }
    catch(err){
         res.json(err.message);
    }
})


//the login route

UserRouter.post("/login",async(req,res)=>{
    try{
        let user=req.body;

        let findUser=await UserModel.findOne({"email":user.email});

        if(!findUser){
            res.json("user not registered");
        }

        bcrypt.compare(findUser.password, user.password, async(err,decoded)=>{
            if(err) {
                res.json("wrong password entered");
            }
            let token=jwt.sign({userid:findUser._id,email:findUser.email,name:findUser.name}, process.env.token, {expiresIn:100});

            let refreshToken=jwt.sign({userid:findUser._id},process.env.refreshToken, {expiresIn:400})

            await redisclient.setEx("token",100,token);
             
            await redisclient.setEx("refreshToken",400,refreshToken);
            res.json("the user has been logged in ")

        })
    }
    catch(err){
        res.json({"error":err.message});
    }
})


//logout route

UserRouter.get("/logout",authentication,async(req,res)=>{
    let token=await redisclient.get("token");
    let refreshToken=await redisclient.get("refreshToken");
    await redisclient.rPush("blacklistToken",token,refreshToken);

    let btokens=await redisclient.lRange("blacklistToken",0,-1);
    console.log(btokens);
    res.json("user logged out successfully");
})


module.exports={
    UserRouter
}