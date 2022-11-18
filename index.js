const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("alo");
});

io.on("connection", (socket) => {
  console.log(socket);
});

server.listen(3333, () => {
  console.log("listening on *:3333");
});
