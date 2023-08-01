const socket = io("https://codingquery.onrender.com", { transports: ["websocket"] });

const chatForm = document.getElementById("chat");
const chatmessages = document.getElementById("messages");
const leftbutton = document.getElementById("left");
const user_name = document.querySelector(".chat-header h1");

leftbutton.addEventListener("click",()=>{
    window.location.href = "../index.html"
})

const username = sessionStorage.getItem("Name");
console.log(username);



user_name.innerText = username;

console.log(username);
socket.emit("joinRoom", { username });

socket.on("message", (message) => {
  console.log(message);
  if (message.username === "system") {
    // Handle system messages (welcome and user joined)
    outputSystemMessage(message);
  } else {
    // Handle regular chat messages
    outputChatMessage(message);
  }
  chatmessages.scrollTop = chatmessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.msg.value;
  let msg = { username: username, msg: message };
  console.log(msg);
  socket.emit("chatmessage", msg);
  e.target.elements.msg.value = ""; // Clear the input field after sending the message
});

function outputSystemMessage(message) {
  let div = document.createElement("div");
  div.classList.add("message");
  div.classList.add("system-message");
  div.classList.add("left"); 
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text+" ";
  para.innerHTML += `<span>${message.time}</span>`

  div.appendChild(para);
  chatmessages.appendChild(div);
}

function outputChatMessage(message) {
  let div = document.createElement("div");
  div.classList.add("message");
  div.classList.add("right");
  let p = document.createElement("p");
  p.classList.add("meta");

  p.innerText = message.username +" ";
  p.innerHTML += `<span>${message.time}</span>`;

  div.appendChild(p);

  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;

  div.appendChild(para);
  chatmessages.appendChild(div);
}
