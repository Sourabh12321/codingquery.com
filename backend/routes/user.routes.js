const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { redisclient } = require("../configs/redis");
const { UserModel } = require("../models/user.model");
const UserRouter = express.Router();
const { authentication } = require("../middlewares/authentication");

UserRouter.get("/getall", async (req, res) => {
  const all = await UserModel.find();
  res.json(all);
});

//To register User
UserRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  console.log(req.body);
  try {
    let findUser = await UserModel.find({ email: email });
    console.log(findUser);
    if (findUser.length>0) {
      console.log(true);
      return res.json("the user is already registered");
    } else {
      bcrypt.hash(password, 6, async (err, hash) => {
        if (err) return res.json("something went wrong");
        else {
          let userData = new UserModel({
            name,
            email,
            password:hash
          })
          await userData.save();
          res.json("User Has Been Registered!!!")
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.json("something went wrong while registering!!!");
  }
});

//to login user
UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ msg: "the user does not exist, please signup first" });
    } else {
      
      
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.json({ msg: "Invalid username or password" });
      }
      // const d = res.cookie('mycookie', 'myvalue');
      // console.log(d);
      
      // document.cookie = `email = ${user.email}`
            //an access token is generated.
      const token = jwt.sign(
        { userid: user._id, email: user.email, name: user.name },
        process.env.token
      );
      console.log(token);
      res.json({ msg: "login successful", token, user:user.name, email:user.email});
    }
  } catch (err) {
    console.log(err);
    res.send("something went wrong in login route");
  }
});

UserRouter.get("/set", async (req, res) => {
  let data = res.cookie("myname", "sourabh");
  console.log(data);
  res.send(data);
})

UserRouter.get("/cookie", async (req, res) => {
  let data = req.cookies.mycookie;
  console.log(data);
  res.send(data);
})

module.exports = {
  UserRouter,
};
