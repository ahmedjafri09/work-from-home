import React, { useEffect, useState } from "react";
import "./styling/styles.css";
import Player from "./components/player";
import Enemy from "./components/enemy";
import PlayerFire from "./components/playerFire";
import PlayerBullet from "./components/playerBullets";

const Game = () => {
  const [enemyArr] = useState([
    { id: 0, name: "enemyAlien", verticle: 10, horizontal: 10 },
    { id: 1, name: "enemyUfo", verticle: 90, horizontal: 10 },
    { id: 2, name: "enemyAlien", verticle: 170, horizontal: 10 },
    { id: 3, name: "enemyUfo", verticle: 250, horizontal: 10 },
    { id: 4, name: "enemyAlien", verticle: 330, horizontal: 10 },
  ]);

  const [playerStates, setPlayerStates] = useState({
    horizontalPos: 365,
    verticalPos: 10,
  });
  const [playerBullets, setPlayerBullets] = useState([]);
  const [playerBulletPosition, setPlayerBulletPosition] = useState([]);

  const handleMovementOfPlayer = (keyPressed) => {
    let newState = {};
    switch (true) {
      case keyPressed.key === "ArrowLeft" && playerStates.horizontalPos > 10:
        newState = {
          horizontalPos: playerStates.horizontalPos - 7,
          verticalPos: playerStates.verticalPos,
        };
        setPlayerStates(newState);
        break;
      case keyPressed.key === "ArrowRight" && playerStates.horizontalPos < 720:
        newState = {
          horizontalPos: playerStates.horizontalPos + 7,
          verticalPos: playerStates.verticalPos,
        };
        setPlayerStates(newState);
        break;
      case keyPressed.key === "ArrowUp" && playerStates.verticalPos < 300:
        newState = {
          horizontalPos: playerStates.horizontalPos,
          verticalPos: playerStates.verticalPos + 7,
        };
        setPlayerStates(newState);

        break;
      case keyPressed.key === "ArrowDown" && playerStates.verticalPos > 10:
        newState = {
          horizontalPos: playerStates.horizontalPos,
          verticalPos: playerStates.verticalPos - 7,
        };
        setPlayerStates(newState);
        break;
      default:
        break;
    }
  };

  const handlePlayerFire = (keyPressed) => {
    if (keyPressed.key === " ") {
      const newBullet = [
        {
          vertical: playerStates.verticalPos + 25,
          horizontal: playerStates.horizontalPos + 27,
        },
      ];
      setPlayerBulletPosition((prev) => prev.concat(newBullet));
      setPlayerBullets((prev) => prev.concat(newBullet));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handlePlayerFire);
    return () => window.removeEventListener("keydown", handlePlayerFire);
  });
  const moveBullet = (bullet) => {
    const newBullets = [...playerBulletPosition];
    const index = newBullets.indexOf(bullet);
    bullet.vertical += 5;
    newBullets[index] = { ...bullet };
    setPlayerBulletPosition(newBullets);

    //   const newPos = {
    //     vertical: playerBulletPosition.vertical + 5,
    //     horizontal: playerBulletPosition.horizontal,
    //   };
    //   setPlayerBulletPosition(newPos);
  };

  return (
    <div className="main">
      <div>
        <Player
          vertical={playerStates.verticalPos}
          horizontal={playerStates.horizontalPos}
          movement={() => handleMovementOfPlayer}
          // bullets={playerBullets}
          // setBullets={() => handlePlayerFire}
        />
        {playerBullets.map((bullet, i) => (
          <PlayerBullet
            key={i}
            vertical={playerBulletPosition[i].vertical}
            horizontal={playerBulletPosition[i].horizontal}
            bullet={playerBulletPosition[i]}
            moveBullet={moveBullet}
          />
        ))}

        {enemyArr.map((enemy) => (
          <Enemy
            key={enemy.id}
            name={enemy.name}
            verticalPosition={enemy.verticle}
            horizontalPosition={enemy.horizontal}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
