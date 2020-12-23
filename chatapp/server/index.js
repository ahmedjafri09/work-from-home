const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const dayjs = require("dayjs");
const assert = require("assert");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://Ahmed:1234@firstcluster.qn8ps.mongodb.net/chat_app?retryWrites=true&w=majority";

//importing router we created
const router = require("./router");

//importing user functions
const {
  signUp,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./users");

// importing db connection
const { main, retrieveUsers } = require("./mongo");
const { format } = require("path");

// main();
// const usersFromDb = retrieveUsers().then;
// console.log("GOT THE DATA WOOHOO!!!! " + usersFromDb[1]);
// let users = [];
// (async () => {
//   const client = new MongoClient(uri);
//   await client.connect(async function (err, client) {
//     assert.strictEqual(null, err);
//     console.log("Connected correctly to server.....");
//     const db = client.db("chat_app");
//     users = await db.collection("users").find().toArray();
//     for (var i = 0; i < users.length; i++) {
//       // console.log("user: " + JSON.stringify(users[i]));
//       console.log(users[i]);
//     }
//   });
// })();

//port to run on
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//connection with mongodb
const client = new MongoClient(uri);

io.on("connection", (socket) => {
  // socket.on("signUp", ({ username, name, email, password }, callback) => {
  //   const { error, user } = signUp({
  //     _id: username,
  //     username,
  //     name,
  //     email,
  //     password,
  //   });

  //   if (error) return callback(error);

  //   // createUser(user);
  //   callback();
  // });

  socket.on("signUp", ({ username, name, email, password }, callback) => {
    (async () => {
      const client = new MongoClient(uri);
      await client.connect(async function (err, client) {
        assert.strictEqual(null, err);
        console.log("Connected correctly to server.....");
        const db = client.db("chat_app").collection("users");
        const users = await db.find().toArray();
        console.log(users.length);
        //finding existing users
        const userExists = users.find((user) => user.username === username);
        console.log(userExists);
        if (userExists) {
          return callback("user already exists!");
        }
        const user = { _id: username, username, name, email, password };
        await db.insertOne(user);
        return callback("Signed up! Welcome " + name);
      });
    })();
  });

  socket.on("login", ({ username, password }, callback) => {
    (async () => {
      const client = new MongoClient(uri);
      await client.connect(async function (err, client) {
        assert.strictEqual(null, err);
        console.log("Connected correctly to server.....");
        const db = client.db("chat_app").collection("users");
        const users = await db.find({ username, password }).toArray();
        console.log(users.length);
        //finding existing users
        if (users.length === 0) {
          return callback("invalid");
        }

        return callback("loggedin");
      });
      // console.log('checking')
    })();
  });

  socket.on("findUser", ({ username }, callback) => {
    (async () => {
      const client = new MongoClient(uri);
      await client.connect(async function (err, client) {
        assert.strictEqual(null, err);
        console.log("Connected correctly to server.....");
        const db = client.db("chat_app").collection("users");
        const users = await db.find({ username }).toArray();
        console.log(users.length);
        //finding existing users
        if (users.length > 0) {
          return callback("user found");
        }
        return callback("");
      });
      // console.log('checking')
    })();
  });

  socket.on("getUsers", ({}, callback) => {
    (async () => {
      const client = new MongoClient(uri);
      await client.connect(async function (err, client) {
        assert.strictEqual(null, err);
        console.log("Connected correctly to server.....");
        const db = client.db("chat_app").collection("users");
        const users = await db.find().toArray();
        const sendUsers = users.map((user) => ({
          _id: user._id,
          name: user.name,
        }));
        console.log(sendUsers.length);
        //finding existing users
        if (sendUsers.length > 0) {
          return callback(sendUsers);
        }
        return callback("");
      });
      // console.log('checking')
    })();
  });

  socket.on("newRoom", ({ room }, callback) => {
    (async () => {
      const client = new MongoClient(uri);
      await client.connect(async function (err, client) {
        assert.strictEqual(null, err);
        console.log("Connected correctly to server.....");
        const db = client.db("chat_app").collection("rooms");
        const rooms = await db.find().toArray();
        console.log(rooms.length);
        //finding existing users
        const roomExists = rooms.find((item) => item._id === room);
        console.log(roomExists);
        if (roomExists) {
          return callback("exists");
        }
        // const roomId = room.toLowerCase();
        const newRoom = { _id: room, name: room, messages: [] };
        await db.insertOne(newRoom);
        return callback("created");
      });
    })();
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

  socket.on("sendMessage", ({ message }, callback) => {
    const user = getUser(socket.id);
    const time = dayjs().format("hh:mm A");
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      time: time,
    });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    (async () => {
      const newMessage = { user: user.name, time: time, text: message };
      const client = new MongoClient(uri);
      await client.connect(async function (err, client) {
        assert.strictEqual(null, err);
        console.log("Connected correctly to server.....");
        const db = client.db("chat_app").collection("rooms");
        await db.updateOne(
          { name: user.room },
          { $push: { messages: newMessage } }
        );
        console.log(user.room);
        console.log("new message added!: " + message);
      });
    })();
    // console.log(user);
    callback();
  });
  socket.on("oldMessages", ({ message }, callback) => {
    console.log("checking if old msg arahay");
    const user = getUser(socket.id);
    (async () => {
      const client = new MongoClient(uri);
      await client.connect(async function (err, client) {
        assert.strictEqual(null, err);
        console.log("Connected correctly to server.....in old messages");
        const db = client.db("chat_app").collection("rooms");
        let msgToFrontEnd = await db
          .find({ name: user.room }, { messages: 1, _id: 0 })
          .toArray();
        msgToFrontEnd = msgToFrontEnd[0].messages.map((msg) => msg);
        msgToFrontEnd.forEach((msg) => {
          console.log(msg);
          io.to(user.room).emit("message", {
            user: msg.user,
            text: msg.text,
            time: msg.time,
          });
        });
        // msgToFrontEnd = msgToFrontEnd[msgToFrontEnd.length - 1];
        console.log(msgToFrontEnd);
        console.log("checking what message: " + message);
      });
    })();
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
