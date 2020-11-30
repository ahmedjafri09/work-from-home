import React, { useEffect, useState } from "react";
import Fire from "./enemyFire";
import PropTypes from "prop-types";
import "../styling/styles.css";

const Enemy = (props) => {
  const { name, verticalPosition, horizontalPosition } = props;
  const [enemyPos, setEnemyPos] = useState(horizontalPosition);
  const [movement, setMovement] = useState("right");
  const [down, setDown] = useState(verticalPosition);
  const [speed, setSpeed] = useState(650);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (enemyPos < 730 && movement === "right") {
        setEnemyPos((prev) => prev + 45);
      } else if (enemyPos >= 730 && movement === "right") {
        setMovement("left");
        if (speed > 150) {
          setSpeed((prev) => prev - 25);
        }
        if (down < 690) {
          setDown((prev) => prev + 20);
        }
      }
      if (enemyPos > 10) {
        if (movement === "left") {
          setEnemyPos((prev) => prev - 45);
        }
      } else if (enemyPos <= 10 && movement === "left") {
        setMovement("right");
        if (speed > 150) {
          setSpeed((prev) => prev - 25);
        }
        if (down < 690) {
          setDown((prev) => prev + 20);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [enemyPos, movement, speed, down]);

  return (
    <>
      <div className={name} style={{ top: down, left: enemyPos }} />
      <Fire verticalPos={down + 50} horizontalPos={enemyPos + 20} />
    </>
  );
};

export default Enemy;

Enemy.propTypes = {
  name: PropTypes.string,
  position: PropTypes.number,
};

Enemy.defaultProps = {
  name: "enemyAlien",
  position: 10,
};
