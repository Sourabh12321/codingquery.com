const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const { formatmessage } = require("./utils/message")
const {userjoin,getcurrentuser,userleave,getroomusers} = require("./utils/users")
const cors=require("cors");
app.use(cors());

const httpServer = http.createServer(app);

app.use(express.static(__dirname + '/frontend'));

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
        io.to(user.room).emit("msg", formatmessage(user.username, msg));
    })

    socket.on("disconnect", () => {
        const user = userleave(socket.id);
        if(user){
            io.to(user.room).emit("msg", formatmessage("Hey!", `${user.username}  is left the chat`))
        }
    })
})


httpServer.listen(2000, () => {
    console.log("start");
})
