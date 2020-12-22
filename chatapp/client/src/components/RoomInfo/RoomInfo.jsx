import React from "react";
import onlineIcon from "../../icons/onlineIcon.png";
import "./roominfo.css";

const RoomData = ({ users }) => {
  return (
    <div className="textContainer">
      {users ? (
        <div>
          <h2>People currently chatting:</h2>
          <div className="activeContainer">
            <h4>
              {users.map(({ name }) => (
                <div key={name} className="activeItem">
                  <img alt="Online Icon" src={onlineIcon} /> &nbsp; {name}
                </div>
              ))}
            </h4>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default RoomData;
