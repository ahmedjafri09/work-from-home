import React from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import "./chat.css";

let socket;

const Chat = ({ location }) => {
  //location is provided by react-router as a prop automatically
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const CONNECTIONPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(CONNECTIONPOINT);
    console.log(socket);

    setName(name);
    setRoom(room);

    //emitting event which will be defined in backend index.js
    socket.emit("join", { name, room }, () => {});

    return () => {
      //emitting disconnect event which we defined in backend index.js
      socket.emit("disconnect");
      //turning the specific socket off on unmount
      socket.off();
    };
  }, [CONNECTIONPOINT, location.search]);
  return <h1>Chat</h1>;
};

export default Chat;
