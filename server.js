const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

io.on("connection", (socket) => {
  console.log("client is connected " + socket.id);


  socket.on("userMessage", (data) => {
    io.sockets.emit("userMessage", data);
  });

  socket.on("userTyping", (data)=>{
    socket.broadcast.emit("userTyping", data);
  })
  
});



