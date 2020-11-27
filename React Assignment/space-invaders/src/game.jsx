import React, { useState } from 'react';
import './styling/styles.css';
import Player from './components/player';
import Enemy from './components/enemy';

const Game = () => {
  const [enemyArr] = useState([{ id: 0, name: 'enemyAlien', position: 10 },
    { id: 1, name: 'enemyUfo', position: 90 },
    { id: 2, name: 'enemyAlien', position: 170 }, { id: 3, name: 'enemyUfo', position: 250 },
    { id: 4, name: 'enemyAlien', position: 330 }]);

  // const [enemyPos, setEnemyPos] = useState();
  console.log(enemyArr);
  // function getRandomInt(min = 10, max = 720) {
  //   return Math.floor(Math.random() * (max - min) + min);
  // }

  // useEffect(() => {
  //   setEnemyPos(() => enemyArr.map(enemy) = enemy.position + getRandomInt(enemy.position));

  // }, []);

  return (
    <div className="main">
      <div>
        <Player />
        {enemyArr.map((enemy) => (
          <Enemy key={enemy.id} name={enemy.name} position={enemy.position} />))}
      </div>
    </div>
  );
};

export default Game;
