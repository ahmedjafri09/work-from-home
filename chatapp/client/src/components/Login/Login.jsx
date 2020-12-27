import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import whatsappLogo from "../../icons/whatsappLogo.png";
import io from "socket.io-client";
import "./login.css";
let socket;
const CONNECTIONPOINT = "localhost:5000";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [ldScreen, setLdScreen] = useState(false);

  const handleLogin = (e) => {
    if (!username || !password) return e.preventDefault();
    setLdScreen(true);

    socket = io(CONNECTIONPOINT);
    socket.emit("login", { username, password }, (callback) => {
      if (callback === "loggedin") {
        console.log(callback);
        setDataLoaded(true);
        setLdScreen(false);
        // alert(callback);
        //   setError(error);
      }
      if (callback === "invalid") {
        setLdScreen(false);
        setErrorMsg(true);
        console.log(callback);
      }
    });
  };

  // const controlTo = () => {
  //   setTimeout()
  // }
  return (
    <LoadingScreen
      loading={ldScreen}
      bgColor="#383838"
      spinnerColor="#8d8d8d"
      textColor="#bdbdbd"
      logoSrc={whatsappLogo}
      text="Logging in please wait..."
    >
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
            {errorMsg ? (
              <p style={{ color: "#ECE5DD" }}>
                Username or Password did not match
              </p>
            ) : null}
          </div>

          <button onClick={handleLogin} className="button mt-20">
            Sign in
          </button>
          {dataLoaded ? <Redirect to={`./join?name=${username}`} /> : null}

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
    </LoadingScreen>
  );
};

export default Login;
