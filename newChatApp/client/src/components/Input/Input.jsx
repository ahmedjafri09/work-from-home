import React from "react";
import "./input.css";

const Input = ({ message, sendMessage, setMessage }) => (
  <form>
    <input
      className="input"
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
