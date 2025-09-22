const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer({ app });
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const onlineUsers = {};
const getReciverSocketId = (userId) => {
  // Function to get the socket ID of a user by their userId
  return onlineUsers[userId];
};
io.on("connection", (socket) => {
  console.log("a user connected");
  const userId = socket.handshake.query.userId;
  if (userId) {
    onlineUsers[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(onlineUsers));
  socket.on("disconnect", () => {
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

module.exports = { io, server, app, getReciverSocketId };
