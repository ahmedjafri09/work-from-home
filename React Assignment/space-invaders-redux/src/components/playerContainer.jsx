import React from "react";
import { useSelector } from "react-redux";
import "../styling/styles.css";

const Player = () => {
  const horizontalPos = useSelector((state) => state.horizontalPos);
  const verticalPos = useSelector((state) => state.verticalPos);
  return (
    <>
      <div
        role="button"
        style={{ left: horizontalPos, bottom: verticalPos }}
        tabIndex="0"
        className="player"
        aria-label="Spacecraft"
      />
    </>
  );
};

export default Player;
