import React, { useEffect, useState } from "react";
import "../styling/styles.css";
import PropTypes from "prop-types";
import Bullet from "./enemyBullets";

const Fire = (props) => {
  const { horizontalPos, verticalPos } = props;
  const [bullets, setBullets] = useState([]);

  const handleBullets = () => {
    const newBullet = [
      {
        vertical: verticalPos,
        horizontal: horizontalPos,
      },
    ];
    setBullets((prev) => prev.concat(newBullet));
  };

  useEffect(() => {
    const getRandomTimeout = (min = 800, max = 3000) => {
      return Math.floor(Math.random() * (max - min) + min);
    };
    const timer = setInterval(() => {
      handleBullets();
    }, getRandomTimeout(2500, 6000));
    return () => clearInterval(timer);
  }, [bullets]);

  return (
    <>
      {bullets.map((bullet, i) => (
        <Bullet key={i} vertical={verticalPos} horizontal={horizontalPos} />
      ))}
    </>
  );
};

export default Fire;

Fire.propTypes = {
  horizontalPos: PropTypes.number,
  verticalPos: PropTypes.number,
};

Fire.defaultProps = {
  horizontalPos: 392,
  verticalPos: 80,
};
