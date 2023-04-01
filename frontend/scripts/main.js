const socket = io("http://localhost:2000",{transports :["websocket"]});

const chatForm = document.getElementById("chat-form");
const chatmessages =document.querySelector(".chat-messages");
const user_name = document.querySelector("#user-name");


const url = new URLSearchParams(window.location.search);
const username = url.get("username");
const room = url.get("room")

console.log(username,room);
user_name.innerText = username;

socket.emit("joinroom",{username,room});

socket.emit("msg","one user in connected");

socket.on("msg",(message)=>{
    console.log(message);
    outputmsg(message);
    chatmessages.scrollTop= chatmessages.scrollHeight;
})

chatForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit("chatmessage",msg);
})

function outputmsg(message){
    let div = document.createElement("div");
    div.classList.add("message");

    let p = document.createElement("p");
    p.classList.add("meta");

    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;


    div.appendChild(p);

    const para = document.createElement("p");

    para.classList.add("text");
    para.innerText = message.text;

    div.appendChild(para);
    chatmessages.appendChild(div);
}