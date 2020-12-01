import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styling/styles.css";

const PlayerBullet = (props) => {
  const { vertical, horizontal, moveBullet } = props;
  const [verticalChange, setVerticalChange] = useState(vertical);

  useEffect(() => {
    setTimeout(() => {
      if (verticalChange < 760) {
        setVerticalChange((prev) => prev + 5);
      }
    }, 10);
  }, [verticalChange]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (vertical < 760) {
  //       moveBullet();
  //     }
  //   }, 10);
  // }, [vertical]);

  if (verticalChange < 760) {
    return (
      <>
        <div
          role="button"
          className="fire"
          aria-label="Bullet"
          style={{ left: horizontal, bottom: verticalChange }}
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
