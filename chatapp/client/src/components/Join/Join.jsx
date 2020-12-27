import React, { useEffect } from "react";
import { useState } from "react";
import queryString from "query-string";
import { Link, Redirect } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import onlineIcon from "../../icons/onlineIcon.png";
import whatsappLogo from "../../icons/whatsappLogo.png";
import "./join.css";
import io from "socket.io-client";

let socket;
const CONNECTIONPOINT = "localhost:5000";

const Join = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  // const [reload, setReload] = useState(true);
  const [ldScreen, setLdScreen] = useState(true);
  const [roomCheck, setRoomCheck] = useState(false);
  const [roomFound, setRoomFound] = useState(false);
  const [exists, setExists] = useState(false);
  const [pubRoom, setPubRoom] = useState(false);
  const [created, setCreated] = useState(false);
  const [creating, setCreating] = useState();
  const [privateRoomName, setPrivateRoomName] = useState("");
  const [roomLoaded, setRoomLoaded] = useState(false);

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    socket = io(CONNECTIONPOINT);
    setName(name);
    socket.emit("atJoinScreen", { name }, () => {});
    console.log(name);
  }, [location]);

  const handleRoom = (e) => {
    if (!room) return e.preventDefault();
    setPubRoom(false);
    setCreating(true);
    setCreated(false);

    socket.emit("newRoom", { room }, (callback) => {
      if (callback === "exists") {
        console.log(callback);
        setExists(true);
        setCreating(false);
      }
      if (callback === "created") {
        console.log(callback);
        setCreating(false);
        setCreated(true);
      }
    });
  };

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    setName(name);
    socket.emit("getUsers", name, () => setUsers(""));
    socket.on("loadUsers", (callback) => {
      console.log(callback);
      setUsers(callback);
      console.log(users);
      setLdScreen(false);
    });
    return () => {
      socket.off();
    };
  }, []);

  const privateRoom = (friendName) => {
    console.log(name);
    setRoomCheck(true);
    let privRoom = name + "" + friendName;
    privRoom = [...privRoom].sort((a, b) => a.localeCompare(b)).join("");
    console.log(privRoom);

    friendName = `${friendName} & ${name}`;
    socket.emit("newPrivateRoom", { privRoom, friendName }, (callback) => {
      if (callback === "exists") {
        console.log(callback);
        setExists(true);
        setCreating(false);
        setPrivateRoomName(privRoom);
        setRoomLoaded(true);
        setRoomCheck(false);
      }
      if (callback === "created") {
        console.log(callback);
        setRoomCheck(false);
        setPrivateRoomName(privRoom);
        setRoomLoaded(true);
      }
    });
  };

  const logOut = (username) => {
    socket.emit("logOut", { username });
  };

  const checkRoomExistence = (room) => {
    setRoomCheck(true);
    socket.emit("findRoom", { room }, (callback) => {
      if (callback === "exists") {
        console.log(callback);
        setRoomFound(true);
        setRoomCheck(false);
      } else {
        console.log(callback);
        setExists(false);
        setPubRoom(true);
        setRoomCheck(false);
      }
    });
  };

  return (
    <LoadingScreen
      loading={roomCheck}
      bgColor="#383838"
      spinnerColor="#8d8d8d"
      textColor="#bdbdbd"
      logoSrc={whatsappLogo}
      text="Joining room please wait..."
    >
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h2 className="heading">Welcome to ChatApp {name}</h2>
          <div>
            <input
              placeholder="Room"
              className="joinInput mt-20"
              type="text"
              onChange={(e) => setRoom(e.target.value)}
            />
            {pubRoom ? <p className="status">Room does NOT exist!</p> : null}
            {creating ? <p className="status">creating room...</p> : null}
            {exists ? <p className="status">Room already exists!</p> : null}
          </div>
          <button
            className="button mt-20"
            type="submit"
            onClick={() => checkRoomExistence(room)}
          >
            Join Room
          </button>
          {roomFound ? (
            <Redirect to={`./chat?name=${name}&room=${room}`} />
          ) : null}
          <button onClick={handleRoom} className="button mt-20" type="submit">
            Create Room
          </button>
          {created ? (
            <Redirect to={`./chat?name=${name}&room=${room}`} />
          ) : null}
          <Link to={"./"}>
            <button
              className="button mt-20"
              type="submit"
              onClick={(e) => (!name ? e.preventDefault : logOut(name))}
            >
              Logout
            </button>
          </Link>
        </div>
        <div className="onlineContainer">
          {ldScreen ? (
            <div style={{ marginTop: "10%" }}>
              <h3 style={{ color: "#4b4b4b" }}>Loading...</h3>
            </div>
          ) : (
            <div className="listContainer">
              <h3>Online Friends:</h3>
              {users.map((user, i) =>
                user._id !== name ? (
                  <h4
                    onClick={() => privateRoom(user._id)}
                    className="onlineList"
                    key={i}
                  >
                    <img alt="Online Icon" src={onlineIcon} /> &nbsp;
                    {` ${user.name} (${user._id})`}
                  </h4>
                ) : null
              )}
              {roomLoaded ? (
                <Redirect to={`chat?name=${name}&room=${privateRoomName}`} />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </LoadingScreen>
  );
};

export default Join;
