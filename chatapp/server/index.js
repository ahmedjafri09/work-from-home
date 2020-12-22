const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const dayjs = require("dayjs");


//importing router we created
const router = require("./router");

//importing user functions
const { signUp, addUser, removeUser, getUser, getUsersInRoom } = require("./users");

//importing db connection
const { main, createRoom, createMessage, createUser, retrieveUsers } = require('./mongo');
main();
// retrieveUsers();

//port to run on
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {

  socket.on("signUp", ({ username, name, email, password }, callback) => {
    const { error, user } = signUp({ _id: username, username, name, email, password });

    if (error) return callback(error);

    // createUser(user);
    callback();
  });

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `Welcome to the ${user.room} ${user.name}`,
      time: dayjs().format("hh:mm A"),
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined us!`,
      time: dayjs().format("hh:mm A"),
    });

    //joins to the room
    socket.join(user.room);

    //display users in room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      time: dayjs().format("hh:mm A"),
    });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user)
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the chat.`,
        time: dayjs().format("hh:mm A"),
      });
  });
});

//calling the router
app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
