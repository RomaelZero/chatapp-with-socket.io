const socket = io();

const message = document.getElementById("message"),
      handle = document.getElementById("handle"),
      output = document.getElementById("output"),
      typing = document.getElementById("typing");
      button = document.getElementById("button");


// send typing message
message.addEventListener("keypress", () => {
  socket.emit("userTyping", handle.value);
});


// send messages to clients      
button.addEventListener("click", (event) => {
    event.preventDefault();
    socket.emit("userMessage", {
        handle: handle.value,
        message: message.value
    });
    message.value = "";
});


// listen for events from the server
socket.on("userMessage", (data)=>{
  typing.innerHTML = "";
  output.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message +'</p>';
});

socket.on("userTyping", (data) => {
  typing.innerHTML = '<p><em> ' + data + ' is typing...</em></p>' 
});

socket.on("connect", () => {
    console.log("Connected to server with id: " + socket.id);
  });


  