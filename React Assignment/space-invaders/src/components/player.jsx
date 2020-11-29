import React, { useState, useEffect } from "react";
import Fire from "./playerFire";
import "../styling/styles.css";

const Player = () => {
  const [horizontalPos, setHorizontalPos] = useState(365);
  const [verticalPos, setVerticalPos] = useState(10);

  const handleMovement = (keyPressed) => {
    switch (true) {
      case keyPressed.key === "ArrowLeft" && horizontalPos > 10:
        setHorizontalPos((p) => p - 7);
        break;
      case keyPressed.key === "ArrowRight" && horizontalPos < 720:
        setHorizontalPos((p) => p + 7);
        break;
      case keyPressed.key === "ArrowUp" && verticalPos < 300:
        setVerticalPos((p) => p + 7);
        break;
      case keyPressed.key === "ArrowDown" && verticalPos > 10:
        setVerticalPos((p) => p - 7);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleMovement);

    return () => {
      window.removeEventListener("keydown", handleMovement);
    };
  });

  return (
    <>
      <div
        role="button"
        style={{ left: horizontalPos, bottom: verticalPos }}
        tabIndex="0"
        className="player"
        aria-label="Spacecraft"
      />
      <Fire horizontalPos={horizontalPos + 27} verticalPos={verticalPos + 70} />
    </>
  );
};

export default Player;
