import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import io from "socket.io-client";
import whatsappLogo from "../../icons/whatsappLogo.png";
import "./authentication.css";

let socket;

const Authentication = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPwd, setInvalidPwd] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState("");
  const CONNECTIONPOINT = "localhost:5000";

  const handleForm = (e) => {
    if (!name || !username || !email || !password) return e.preventDefault();
    let emailinvalid = false;
    let pwdinvalid = false;

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      //invalid
      setInvalidEmail(true);
      emailinvalid = true;
    } else {
      setInvalidEmail(false);
      emailinvalid = false;
    }

    if (password.length < 6) {
      //invalid
      setInvalidPwd(true);
      pwdinvalid = true;
    } else {
      setInvalidPwd(false);
      pwdinvalid = false;
    }
    if (!emailinvalid && !pwdinvalid) {
      console.log("in sign up!");
      setSigningUp(true);
      setUserExists(false);
      socket = io(CONNECTIONPOINT);
      socket.emit("signUp", { username, name, email, password }, (callback) => {
        if (callback === "usernameexists") {
          setError("Username already exists!");
          setUserExists(true);
          setSigningUp(false);
        }
        if (callback === "emailexists") {
          setError("Email already exists!");
          setUserExists(true);
          setSigningUp(false);
        }
        if (callback === "bothexist") {
          setError("Username and Email are taken");
          setUserExists(true);
          setSigningUp(false);
        }
        if (callback === "signedup") {
          setError("");
          setSigningUp(false);
          setRedirect(true);
        }
      });
    }
  };

  return (
    <LoadingScreen
      loading={signingUp}
      bgColor="#383838"
      spinnerColor="#8d8d8d"
      textColor="#bdbdbd"
      logoSrc={whatsappLogo}
      text="Signing up please wait..."
    >
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
          <div className="inputContainer">
            <input
              placeholder="email@email.com"
              className="joinInput mt-20"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            {invalidEmail ? (
              <p className="status">please enter a valid email</p>
            ) : null}
          </div>
          <div className="inputContainer">
            <input
              placeholder="password"
              className="joinInput mt-20"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {invalidPwd ? (
              <p className="status">
                lenth of password must be greated than six
              </p>
            ) : null}
          </div>
          {userExists ? <p className="status">{error}</p> : null}
          <button className="button mt-20" type="submit" onClick={handleForm}>
            Register
          </button>

          {redirect ? <Redirect to={`./join?name=${username}`} /> : null}
          <Link to={"./"}>
            <button className="button mt-20" type="submit">
              Sign in
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
    </LoadingScreen>
  );
};

export default Authentication;
