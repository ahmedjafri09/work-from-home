import React, { useEffect, useState } from "react";
import "../styling/styles.css";
import PropTypes from "prop-types";
import Bullet from "./playerBullets";

const Fire = (props) => {
  // const { bullets, setBullets } = props;

  // useEffect(() => {
  //   window.addEventListener("keydown", setBullets());

  //   return () => {
  //     window.removeEventListener("keydown", setBullets());
  //   };
  // });

  const handeMoveBullet = (bullet) => {};

  return (
    // <>
    //   {bullets.map((bullet, i) => (
    //     <Bullet
    //       key={i}
    //       // vertical={bullet.vertical}
    //       // horizontal={bullet.horizontal}
    //       bullet={bullet}
    //       moveBullet={handleMoveBullet}
    //     />
    //   ))}
    // </>
    null
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
