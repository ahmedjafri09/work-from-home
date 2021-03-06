import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styling/styles.css";

const Bullet = (props) => {
  const { vertical, horizontal } = props;
  const [horizontalPos] = useState(horizontal);
  const [bulletPosition, setBulletPosition] = useState(vertical);

  useEffect(() => {
    setTimeout(() => {
      if (bulletPosition < 760) {
        setBulletPosition((prev) => prev + 5);
      }
    }, 10);
  }, [bulletPosition]);

  if (bulletPosition < 760) {
    return (
      <>
        <div
          role="button"
          className="fire"
          aria-label="Bullet"
          style={{ left: horizontalPos, top: bulletPosition }}
        />
      </>
    );
  } else {
    return null;
  }
};

export default Bullet;

Bullet.propTypes = {
  horizontal: PropTypes.number,
  vertical: PropTypes.number,
};

Bullet.defaultProps = {
  horizontal: 392,
  vertical: 80,
};
