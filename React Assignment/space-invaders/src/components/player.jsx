import React, { useEffect } from "react";
import "../styling/styles.css";
import PlayerFire from "./playerFire";

const Player = (props) => {
  // const [horizontalPos, setHorizontalPos] = useState(365);
  // const [verticalPos, setVerticalPos] = useState(10);
  const { vertical, horizontal, movement } = props;

  useEffect(() => {
    window.addEventListener("keydown", movement());

    return () => {
      window.removeEventListener("keydown", movement());
    };
  });

  return (
    <>
      <div
        role="button"
        style={{ bottom: vertical, left: horizontal }}
        tabIndex="0"
        className="player"
        aria-label="Spacecraft"
      />
      {/* <PlayerFire horizontal={horizontal + 27} vertical={vertical + 70} /> */}
    </>
  );
};

export default Player;
