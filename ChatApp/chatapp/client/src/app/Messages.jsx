import React from "react";
import "./messages.css";
import dayjs from "dayjs";
// import { useState } from "react";

const Messages = (props) => {
  //   const { message, setMessage } = useState([]);
  const { sender, message } = props;
  let classname;
  let time = dayjs().format("hh:mm A");
  // let currTime = time.getHours() + ":" + time.getMinutes();
  sender === true
    ? (classname = "message-sender")
    : (classname = "message-reciever");
  return (
    <div className={classname}>
      {message}
      <p className="text-muted">{time}</p>
    </div>
  );
};

export default Messages;
