const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const db = require("./db");
const app = express();
const httpServer = createServer(app);
const cors = require("cors");

let messages = [];

app.use(cors);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`);

  socket.on("sendMessage", (data) => {
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });

  socket.on("requestDeviceData", (data) => {
    console.log(`User : ${socket.id} requested temperature Data`);
    socket.emit("devicesData", db);
  });
});

httpServer.listen(3333);
