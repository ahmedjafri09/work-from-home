import React, { useEffect, useState } from 'react';
import '../styling/styles.css';
import PropTypes from 'prop-types';

const Fire = (props) => {
  const { horizontalPos, verticalPos } = props;
  const [firing, setFiring] = useState(verticalPos);
  const [bullets, setBullets] = useState([{ horizontal: horizontalPos, vertical: verticalPos, firing: verticalPos }]);

  const handleFiring  = (bullet) => {
    const newBullets = [...bullets];
    const index = newBullets.indexOf(bullet);
    newBullets[index] = { ...bullet };
    setBullets(newBullets);
  };

  useEffect(() => {
    setTimeout(() => {
      if (firing < 760) {
        setFiring((prev) => prev + 16);
      } else {
        setFiring(verticalPos);
      }
    }, 10);
  }, [firing]);

  useEffect(() => {
    setTimeout(() => {
      setBullets([{ horizontal: horizontalPos, vertical: firing }]);
    }, 10);
  }, [bullets]);

  return (
    <>
      {bullets.filter((i) => i.vertical < 760).map((bullet) => (<div role="button" className="fire" aria-label="Bullet" style={{ left: bullet.horizontal, bottom: bullet.vertical }} />))}
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
