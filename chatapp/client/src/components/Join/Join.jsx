import React, { useEffect } from "react";
import { useState } from "react";
import queryString from 'query-string';
import { Link } from "react-router-dom";
import "./join.css";
import io from "socket.io-client";

let socket;
const CONNECTIONPOINT = "localhost:5000";

const Join = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [ldScreen, setLdScreen] = useState(true);

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    setName(name);
    console.log(name);

  }, [location]);

  useEffect(() => {
    socket = io(CONNECTIONPOINT);
    socket.emit('getUsers', {}, (callback) => {
      // console.log(callback);
      setUsers([...callback]);
      console.log(users);
      setLdScreen(false);
    });
    return () => {
      socket.off();
    }
  }, [])

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h2 className="heading">Enter ChatApp Room {name}</h2>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
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
          to={'./'}
        >
          <button className="button mt-20" type="submit">
            Logout
        </button>
        </Link>
      </div>
      <div className='onlineContainer'>
        {ldScreen ? <div style={{ marginTop: '10%' }}><h3>Loading...</h3></div> : <div className='listContainer'>{users.map((user, i) => (
          <h4 className="onlineList" key={i}>{user.name}</h4>
        ))}</div>}


      </div>
    </div>

  );
};

export default Join;
