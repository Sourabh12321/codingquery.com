const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateUser = (req,res,next)=>{
    let token =  req.headers.authorization;
    console.log(token)
    try {
        if(!token){
            return res.send("Please Login Again!!")
        }
        jwt.verify(token, process.env.token, (err, decoded)=>{
            if(err){
                console.log(err)
                res.send({"Message":"Please Login First!!" ,"error":err.message})
            }else{
                    console.log(decoded)
                    req.body.userid=decoded.userid;
                    req.body.email=decoded.email;
                    req.body.name=decoded.name;
                    next()
            }
          });
    } catch (error) {
        console.log(error)
        res.send("Something went wrong at validate Middleware!!")
    }
}

module.exports ={
    validateUser
}
