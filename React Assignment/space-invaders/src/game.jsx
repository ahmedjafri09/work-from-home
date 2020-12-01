import React, { useEffect, useState } from "react";
import "./styling/styles.css";
import Player from "./components/player";
import Enemy from "./components/enemy";
import PlayerBullet from "./components/playerBullets";

const Game = () => {
  const [pauseStatus, setPauseStatus] = useState("false");
  const [enemyArr] = useState([
    { id: 0, name: "enemyAlien", verticle: 10, horizontal: 10 },
    { id: 1, name: "enemyUfo", verticle: 90, horizontal: 10 },
    { id: 2, name: "enemyAlien", verticle: 170, horizontal: 10 },
    { id: 3, name: "enemyUfo", verticle: 250, horizontal: 10 },
    { id: 4, name: "enemyAlien", verticle: 330, horizontal: 10 },
  ]);
  const enemyCopy = [...enemyArr];

  const [playerStates, setPlayerStates] = useState({
    horizontalPos: 365,
    verticalPos: 10,
  });
  const [playerBullets, setPlayerBullets] = useState([]);
  let [playerBulletPosition, setPlayerBulletPosition] = useState([]);

  const pause = () => {
    if (pauseStatus === "true") {
      setPauseStatus("false");
    } else {
      setPauseStatus("true");
    }
  };

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
    const newBullets = [...playerBullets];
    const index = newBullets.indexOf(bullet);
    bullet.vertical += 5;
    newBullets[index] = { ...bullet };
    setPlayerBullets(newBullets);
  };
  // const moveBullets = (bullet) => {
  //   // const newPos = playerBulletPosition[index];
  //   // newPos.vertical += 5;
  //   // playerBulletPosition[index] = { ...newPos };

  //   //this logic is if passing the bullet object
  //   const newBullets = [...playerBulletPosition];
  //   const index = newBullets.indexOf(bullet);
  //   bullet.vertical += 5;
  //   newBullets[index] = { ...bullet };
  //   setPlayerBulletPosition(newBullets);

  //   //   const newPos = {
  //   //     vertical: playerBulletPosition.vertical + 5,
  //   //     horizontal: playerBulletPosition.horizontal,
  //   //   };
  //   //   setPlayerBulletPosition(newPos);
  // };
  const destroyEnemy = () => {
    
  }

  if (pauseStatus === "true") {
    return (
      <>
        <button onClick={pause}>Play</button>
        <div className="main">
          <div>
            <h1 style={{ color: "white" }}>GAME PAUSED</h1>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <button onClick={pause}>Pause</button>
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
                listOfEnemies = {enemyCopy}
                destroyEnemy={()=>destroyEnemy}
                vertical={bullet.vertical}
                horizontal={bullet.horizontal}
                moveBullet={() => moveBullet(bullet)}
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
      </>
    );
  }
};

export default Game;
