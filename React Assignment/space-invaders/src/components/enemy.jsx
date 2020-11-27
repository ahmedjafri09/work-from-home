import React from 'react';
import PropTypes from 'prop-types';
import '../styling/styles.css';

const Enemy = (props) => {
  const { name, position } = props;

  return (
    <div className={name} style={{ top: position, left: 10 }} />
  );
};

export default Enemy;

Enemy.propTypes = {
  name: PropTypes.string,
  position: PropTypes.number,
};

Enemy.defaultProps = {
  name: 'enemyAlien',
  position: 0,
};
