const express = require("express");
const socketio = require("socket.io");
const http = require("http");

//importing router we created
const router = require("./router");

//importing user functions
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

//port to run on
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `Welcome to the ${user.room} ${user.name}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined us!` });

    //joins to the room
    socket.join(user.room);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//calling the router
app.use(router);

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
