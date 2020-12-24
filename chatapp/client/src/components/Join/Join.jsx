import React, { useEffect } from "react";
import { useState } from "react";
import queryString from "query-string";
import { Link, Redirect } from "react-router-dom";
import "./join.css";
import io from "socket.io-client";

let socket;
const CONNECTIONPOINT = "localhost:5000";

const Join = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [ldScreen, setLdScreen] = useState(true);
  const [exists, setExists] = useState(false);
  const [creating, setCreating] = useState();
  const [privateRoomName, setPrivateRoomName] = useState('');
  const [roomLoaded, setRoomLoaded] = useState(false);

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    socket = io(CONNECTIONPOINT);
    setName(name);
    console.log(name);
  }, [location]);

  const handleRoom = (e) => {
    if (!room) return e.preventDefault();
    setCreating(true);

    socket.emit("newRoom", { room }, (callback) => {
      if (callback === "exists") {
        console.log(callback);
        // alert(callback);
        setExists(true);
        setCreating(false)
      }
      if (callback === "created") {
        console.log(callback);
        setCreating(false);
        // alert(callback);
        // setExists(false);
      }
    });
  };

  useEffect(() => {
    // socket = io(CONNECTIONPOINT);
    socket.emit("getUsers", {}, (callback) => {
      // console.log(callback);
      setUsers([...callback]);
      // console.log(users);
      setLdScreen(false);
    });
    return () => {
      // socket.emit("leaving");
      socket.off();
    };
  }, users);

  const privateRoom = (friendName) => {
    // console.log(socket.id);
    const { name } = queryString.parse(location.search);
    setName(name);
    console.log(name);
    let privRoom = name + "" + friendName;
    privRoom = [...privRoom].sort((a, b) => a.localeCompare(b)).join("");
    console.log(privRoom);

    socket.emit("newPrivateRoom", { privRoom }, (callback) => {
      if (callback === "exists") {
        console.log(callback);
        // alert(callback);
        setExists(true);
        setCreating(false)
        setPrivateRoomName(privRoom);
        setRoomLoaded(true);
      }
      if (callback === "created") {
        console.log(callback);
        setPrivateRoomName(privRoom);
        setRoomLoaded(true);
        // alert(callback);
        // setExists(false);
      }
    });
  }

  const logOut = (username) => {
    // event.preventDefault();

    socket.emit('logOut', { username });
  }


  return (
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
          {creating ? <p className='status'>creating room...</p> : null}
          {exists ? <p className='status'>Room already exists!</p> : null}
        </div>
        <button onClick={handleRoom} className="button mt-20" type="submit">
          Create Room
        </button>
        <Link
          onClick={(e) => (!room ? e.preventDefault() : null)}
          to={`./chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Join Room
          </button>
        </Link>
        <Link
          // onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={"./"}
        >
          <button className="button mt-20" type="submit" onClick={(e) => (!name ? e.preventDefault : logOut(name))}>
            Logout
          </button>
        </Link>
      </div>
      <div className="onlineContainer">
        {ldScreen ? (
          <div style={{ marginTop: "10%" }}>
            <h3>Loading...</h3>
          </div>
        ) : (
            <div className="listContainer">
              <h3>Online Friends:</h3>
              {users.map((user, i) => (
                user._id !== name ?
                  <h4 onClick={() => privateRoom(user._id)} className="onlineList" key={i}>
                    {user.name}
                  </h4> : null
              ))}
              {roomLoaded ? <Redirect to={`chat?name=${name}&room=${privateRoomName}`} /> : null}
            </div>
          )}
      </div>
    </div>
  );
};

export default Join;
