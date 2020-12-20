import React from "react";
import "./message.css";
import reactEmoji from "react-emoji";

const Message = ({ message: { user, text, time }, name }) => {
  let currentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    currentUser = true;
  }

  return currentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{`${trimmedName} ${time}`}</p>
      <div className="messageBox backgroundGreen">
        <p className="messageText">{reactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText">{reactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10">{`${user} ${time}`}</p>
    </div>
  );
};

export default Message;
