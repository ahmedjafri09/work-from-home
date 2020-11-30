import React, { useEffect } from "react";
import Fire from "./playerFire";
import "../styling/styles.css";

const Player = (props) => {
  // const [horizontalPos, setHorizontalPos] = useState(365);
  // const [verticalPos, setVerticalPos] = useState(10);
  const { vertical, horizontal, movement } = props;

  // useEffect(() => {
  //   window.addEventListener("keydown", movement);

  //   return () => {
  //     window.removeEventListener("keydown", movement);
  //   };
  // });

  return (
    <>
      <div
        role="button"
        style={{ bottom: vertical, left: horizontal }}
        tabIndex="0"
        className="player"
        aria-label="Spacecraft"
        onKeyDown={movement()}
      />
      <Fire horizontal={horizontal + 27} vertical={vertical + 70} />
    </>
  );
};

export default Player;
