import React, { useState } from "react";
import "./styling/styles.css";
import Player from "./components/player";
import Enemy from "./components/enemy";

const Game = () => {
  // const initialPlayerStates = { horizontalPos: 365, verticalPos: 10 };

  // const [enemyArr] = useState([
  //   { id: 0, name: "enemyAlien", position: 10 },
  //   { id: 1, name: "enemyUfo", position: 90 },
  //   { id: 2, name: "enemyAlien", position: 170 },
  //   { id: 3, name: "enemyUfo", position: 250 },
  //   { id: 4, name: "enemyAlien", position: 330 },
  // ]);

  const [playerVerticalPos, setPlayerVerticalPos] = useState(10);
  const [playerHorizontalPos, setPlayerHorizontalPos] = useState(365);
  const [playerBullet];

  const handleMovementOfPlayer = (keyPressed) => {
    switch (true) {
      case keyPressed.key === "ArrowLeft" && playerHorizontalPos > 10:
        setPlayerHorizontalPos((prev) => prev - 7);
        break;
      case keyPressed.key === "ArrowRight" && playerHorizontalPos < 720:
        setPlayerHorizontalPos((prev) => prev + 7);
        break;
      case keyPressed.key === "ArrowUp" && playerVerticalPos < 300:
        setPlayerVerticalPos((prev) => prev + 7);

        break;
      case keyPressed.key === "ArrowDown" && playerVerticalPos > 10:
        setPlayerVerticalPos((prev) => prev - 7);

        break;
      default:
        break;
    }
  };

  return (
    <div className="main">
      <div>
        <Player
          vertical={playerVerticalPos}
          horizontal={playerHorizontalPos}
          movement={() => handleMovementOfPlayer}
        />
        <Enemy />
        {/* {enemyArr.map((enemy) => (
          <Enemy key={enemy.id} name={enemy.name} position={enemy.position} />))} */}
      </div>
    </div>
  );
};

export default Game;
