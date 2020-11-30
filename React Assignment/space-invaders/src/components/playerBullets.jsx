import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styling/styles.css";

const PlayerBullet = (props) => {
  const { vertical, horizontal, moveBullet } = props;
  // const [bulletPosition, setBulletPosition] = useState(vertical);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (bulletPosition < 760) {
  //       setBulletPosition((prev) => prev + 5);
  //     }
  //   }, 10);
  // }, [bulletPosition]);

  useEffect(() => {
    setTimeout(() => {
      if (vertical < 760) {
        moveBullet();
      }
    }, 10);
  }, [vertical]);

  if (vertical < 760) {
    return (
      <>
        <div
          role="button"
          className="fire"
          aria-label="Bullet"
          style={{ left: horizontal, bottom: vertical }}
        />
      </>
    );
  } else {
    return null;
  }
};

export default PlayerBullet;

PlayerBullet.propTypes = {
  horizontal: PropTypes.number,
  vertical: PropTypes.number,
};

PlayerBullet.defaultProps = {
  horizontal: 392,
  vertical: 80,
};
