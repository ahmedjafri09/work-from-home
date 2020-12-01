import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleMovement } from "../redux/player/playerAction";
import "../styling/styles.css";

const Player = () => {
  const horizontalPos = useSelector((state) => state.horizontalPos);
  const verticalPos = useSelector((state) => state.verticalPos);

  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("keydown", () => dispatch(handleMovement));

    return () =>
      window.removeEventListener("keydown", () => dispatch(handleMovement));
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
    </>
  );
};

export default Player;
