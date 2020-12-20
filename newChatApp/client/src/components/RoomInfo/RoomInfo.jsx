import React from "react";
import onlineIcon from "../../icons/onlineIcon.png";
import "./roominfo.css";

const RoomData = ({ users }) => {
  console.log(users);
  return (
    <div className="textContainer">
      {users ? (
        <div>
          <h1>People currently chatting:</h1>
          <div className="activeContainer">
            <h2>
              {users.map(({ name }) => (
                <div key={name} className="activeItem">
                  <img alt="Online Icon" src={onlineIcon} /> &nbsp; {name}
                </div>
              ))}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default RoomData;
