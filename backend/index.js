const http = require("http");
const express = require("express");
const socketio = require("socket.io");
require("dotenv").config();
const {UserRouter}=require("./routes/user.routes");
const {passport}=require("./oauth(google)");

const redis=require("redis");
const cors=require("cors");

const app = express();
app.use(express.json())
const { formatmessage } = require("./utils/message")
const {userjoin,getcurrentuser,userleave,getroomusers} = require("./utils/users")
app.use(cors());

const httpServer = http.createServer(app);

app.use(express.static(__dirname + '/frontend'));




//redis
const redisClient = redis.createClient({
    url:`redis://default:XBQ8RCOsTH2LhM1C3qirvUdY3cjx4U6j@redis-11492.c301.ap-south-1-1.ec2.cloud.redislabs.com:11492`
})

redisClient.on('error',(err)=>{console.log(err.message)});
(async()=>await redisClient.connect())();
redisClient.on("ready",()=>{console.log("connected to Redis");});


app.use("/user",UserRouter);


//routes to apply google auth on the login page
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', {
     successRedirect:"https://www.facebook.com",
     failureRedirect: '/login',
     session:false
     }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect('/');
  });


const io = socketio(httpServer);

io.on("connection", (socket) => {
    socket.on("joinroom", ({ username, room }) => {
        const user = userjoin(socket.id,username,room);
        socket.join(user.room);
        console.log("one user is connected");
        socket.emit("msg", formatmessage("Hey!", `${username} welcome to coding query`));
        socket.broadcast.to(user.room).emit("msg", formatmessage("Hey!", `${username}  is joined the chat`));
    })

    socket.on("chatmessage", (msg) => {
        const user = getcurrentuser(socket.id);
        console.log(user,"hello");
        io.to(user.room).emit("msg", formatmessage(user.username, msg));
    })

    socket.on("disconnect", () => {
        const user = userleave(socket.id);
        if(user){
            io.to(user.room).emit("msg", formatmessage("Hey!", `${user.username}  is left the chat`))
        }
    })
})



//connecting to the server 
httpServer.listen(1700, () => {
    console.log("start");
})