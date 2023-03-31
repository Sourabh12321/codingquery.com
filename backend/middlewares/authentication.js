const jwt=require("jsonwebtoken");

const {redisclient}=require("../configs/redis");

require("dotenv").config();

const authentication=async(req,res,next)=>{
    let token=await redisclient.get("token");

    console.log(token);

    if(token){
        if(!await redisclient.lPos("blacklistToken",token)){
            jwt.verify(token,process.env.token, (err,decoded)=>{
                if(decoded){
                    req.body.userid=decoded.userid;
                    req.body.email=decoded.email;
                    req.body.name=decoded.name;
                    console.log(decoded);
                    next();
                }
            })
        }
        else{
            res.send("please log in first");
        }
    }
    else{
        let refreshToken=await redisclient.get("refreshToken");

        if(refreshToken){
            if(await redisclient.lPos("blacklistToken",refreshToken)){
                return res.send("please login again ,refresh token expired");
            }
            else{
                jwt.verify(refreshToken,process.env.refreshToken, async(err,decoded)=>{
                    if(decoded){
                        let userid=decoded.uid;
                        let token=jwt.sign({userid:userid},process.env.token);
                        await redisclient.set("token",token);
                        req.body.userid=userid;
                        next();
                    }
                    else{
                        res.send("please login again");
                    }
                })
            }
        }else{
            res.send("kindly login first");
        }
    }
}

module.exports={
    authentication
}