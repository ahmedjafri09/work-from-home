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

    const handleLogin = () => {

    }
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
                        placeholder="Room"
                        className="joinInput mt-20"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Link
                    onClick={handleLogin}
                    to={`./`}
                >
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
