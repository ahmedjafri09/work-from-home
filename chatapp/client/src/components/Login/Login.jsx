import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import "./login.css";
let socket;
const CONNECTIONPOINT = "localhost:5000";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    if (!username || !password) return e.preventDefault();

    socket = io(CONNECTIONPOINT);
    socket.emit("login", { username, password }, (callback) => {
      if (callback) {
        console.log(callback);
        alert(callback);
        //   setError(error);
      }
    });
  };
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Enter ChatApp</h1>
        <div>
          <input
            placeholder="Username"
            className="joinInput"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            className="joinInput mt-20"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link onClick={handleLogin} to={`./signup`}>
          <button className="button mt-20" type="submit">
            Sign in
          </button>
        </Link>
        <Link
          // onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`./signup`}
        >
          <button className="button mt-20" type="submit">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
