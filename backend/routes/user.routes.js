const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { redisclient } = require("../configs/redis");
const { UserModel } = require("../models/user.model");
const UserRouter = express.Router();

const { authentication } = require("../middlewares/authentication");


UserRouter.post("/register", async (req, res) => {
  let user = req.body;

  try {
    let findUser = await UserModel.findOne({ email: user.email });
    if (findUser) {
      return res.json("the user is already registered");
    }

    bcrypt.hash(user.password, 6, async (err, hash) => {
      if (err) return res.json("something went wrong");
      else {
        user.password = hash;

        user = new UserModel(user);
        await user.save();
        res.json("The user user has now been registered");
      }
    });
  } catch (err) {
    console.log(err);
    res.json("something went wrong while registering!!!");
  }
});


//login router
UserRouter.post("/login", async (req, res) => {

      }
      //an access token is generated.
      const token = jwt.sign(
        { userid: user._id, email: user.email, name: user.name },
        process.env.token
      );
      console.log(token);
      res.json({ msg: "login successful", token });
    }
  } catch (err) {
    console.log(err);
    res.send("something went wrong in login route");
  }
});

//logout route

UserRouter.get("/getall",async(req,res)=>{
  const all = await UserModel.find()
  res.json(all)
})


module.exports = {
  UserRouter,
};



