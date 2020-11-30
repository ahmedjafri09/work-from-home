import React, { useEffect, useState } from "react";
import "../styling/styles.css";
import PropTypes from "prop-types";
import Bullet from "./playerBullets";

const PlayerFire = (props) => {
  const { horizontalPos, verticalPos } = props;
  const [bullets, setBullets] = useState([]);

  const makeBullets = (key) => {
    if (key.key === " ") {
      const newBullet = [
        {
          vertical: verticalPos,
          horizontal: horizontalPos,
        },
      ];
      setBullets((prev) => prev.concat(newBullet));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", makeBullets);

    return () => {
      window.removeEventListener("keydown", makeBullets);
    };
  });

  return (
    <>
      {bullets.map((bullet, i) => (
        <Bullet
          key={i}
          vertical={bullet.vertical}
          horizontal={bullet.horizontal}
        />
      ))}
    </>
  );
};

export default PlayerFire;

// PlayerFire.propTypes = {
//   horizontalPos: PropTypes.number,
//   verticalPos: PropTypes.number,
// };

// PlayerFire.defaultProps = {
//   horizontalPos: 392,
//   verticalPos: 80,
// };
