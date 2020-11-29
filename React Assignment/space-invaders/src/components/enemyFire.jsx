import React, { useEffect, useState } from "react";
import "../styling/styles.css";
import PropTypes from "prop-types";
import Bullet from "./playerBullets";

const Fire = (props) => {
  const { horizontalPos, verticalPos } = props;
  const [vertical, setVertical] = useState(verticalPos);
  const [horizontal, setHorizontal] = useState(horizontalPos);
  const [bullets, setBullets] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (vertical < 720) {
        setHorizontal((prev) => prev);
        setVertical((prev) => prev + 7);
      } else {
        setVertical(verticalPos);
      }
    }, 10);
  }, [vertical]);

  return <div className="fire" style={{ left: horizontal, top: vertical }} />;
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
