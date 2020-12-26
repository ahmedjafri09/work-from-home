import React from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import "./chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import RoomInfo from "../RoomInfo/RoomInfo";

let socket;

const Chat = ({ location }) => {
  //location is provided by react-router as a prop automatically
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState();
  const [chatHistory, setHistory] = useState();
  const [loaded, setLoaded] = useState(false);
  const CONNECTIONPOINT = "192.168.0.106:5000";

  //for joining
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    let chatName;
    socket = io(CONNECTIONPOINT);
    console.log("getting room name");
    socket.emit("getRoomName", { room }, (roomName) => {
      setRoom(roomName);
      chatName = roomName;
    });
    setName(name);
    // console.log(name);
    // setRoom(room);

    //emitting event which will be defined in backend index.js
    socket.emit("join", { name, room }, () => {});

    return () => {
      //emitting disconnect event which we defined in backend index.js
      // socket.emit("disconnect");
      //turning the specific socket off on unmount
      socket.off();
    };
  }, [CONNECTIONPOINT, location.search]);

  //for showing message
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
      // console.log(users)
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  useEffect(() => {
    ////////////////////////////
    socket.emit("oldMessage", {}, () => setMessage(""));
    socket.on("chatHistory", (history) => {
      // console.log('getting chat history');
      setHistory(history);
      setLoaded(true);
    });
    if (chatHistory) {
      setMessages(messages.concat(chatHistory));
    }
  }, chatHistory);

  //for sending message
  const sendMessage = (event) => {
    event.preventDefault();

    socket.emit("sendMessage", { message }, () => setMessage(""));
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} name={name} />
        {loaded ? null : <div className="loadingMessage">loading messages</div>}
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <RoomInfo users={users} />
    </div>
  );
};

export default Chat;
