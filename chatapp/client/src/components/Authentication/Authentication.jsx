import React, { useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

let socket;

const Authentication = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const CONNECTIONPOINT = "localhost:5000";

  const handleForm = (e) => {
    if (!name || !username || !email || !password) return e.preventDefault();

    socket = io(CONNECTIONPOINT);
    socket.emit("signUp", { username, name, email, password }, (callback) => {
      if (callback) {
        console.log(callback);
        // alert(callback);
      }
    });
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Sign up</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Username"
            className="joinInput mt-20"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="email@email.com"
            className="joinInput mt-20"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="password"
            className="joinInput mt-20"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to={"./"} >
          <button className="button mt-20" type="submit" onClick={handleForm}>
            Register
        </button>
        </Link>
        {/* <Link
                    onClick={handleForm}
                    to={''}
                >
                    {error ?
                        <button className="button mt-20" type="submit" >
                            Register
                    </button>
                        :
                        <button className="button mt-20" type="submit" to={`./chat?name=${name}&room=${email}`}>
                            Register
                    </button>
                    }
                </Link> */}
      </div>
    </div>
  );
};

export default Authentication;
