import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styling/styles.css";

const Bullet = (props) => {
  const { vertical, horizontal } = props;
  const [bulletPosition, setBulletPosition] = useState(vertical);

  useEffect(() => {
    setTimeout(() => {
      if (bulletPosition < 760) {
        setBulletPosition((prev) => prev + 7);
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
          style={{ left: horizontal, bottom: bulletPosition }}
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
