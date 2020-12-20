import React from "react";
import "./message.css";
import reactEmoji from "react-emoji";

const Message = ({ message: { user, text }, name }) => {
  let currentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    currentUser = true;
  }

  return currentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{reactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{reactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  );
};

export default Message;
