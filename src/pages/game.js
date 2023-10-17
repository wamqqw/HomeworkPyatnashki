import React, { useState, useEffect } from 'react';
import '../css/game.css';

const Game = () => {
  const [tiles, setTiles] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const rows = 3;
  const cols = 3;

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    let initialTiles = [...Array(rows * cols).keys()];
    initialTiles = shuffleArray(initialTiles);
    setTiles(initialTiles);
    setIsSolved(false);
    setMoves(0);
    setStartTime(new Date());
    setCurrentTime(0);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleTileClick = (index) => {
    if (isSolved) return;

    const tileValue = tiles[index];
    if (tileValue === rows * cols - 1) return; 
    const emptyIndex = tiles.indexOf(rows * cols - 1);
    const tileRow = Math.floor(index / cols);
    const tileCol = index % cols;
    const emptyRow = Math.floor(emptyIndex / cols);
    const emptyCol = emptyIndex % cols;

    if (Math.abs(tileRow - emptyRow) + Math.abs(tileCol - emptyCol) === 1) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = tileValue;
      newTiles[index] = rows * cols - 1;

      setTiles(newTiles);
      setMoves(moves + 1);

      if (checkSolved(newTiles)) {
        const currentTime = (new Date() - startTime) / 1000;
        setIsSolved(true);
        setCurrentTime(currentTime);
      }
    }
  };

  const checkSolved = (tiles) => {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i] !== i) return false;
    }
    return true;
  };

  const renderTile = (tile, index) => (
    <div
      key={index}
      className={`tile ${tile === rows * cols - 1 ? 'empty' : ''}`}
      onClick={() => handleTileClick(index)}
    >
      {tile !== rows * cols - 1 ? tile + 1 : ''}
    </div>
  );
  const SolveGame = () => {
    // ???? :(
  }  


  return (
    <div className="Game">
      <h1>Barley-Break</h1>
      <div className="moves">Moves: {moves}</div>
      <button onClick={initializeGame}>Start new Game</button>
      <div className="game-board">
        {tiles.map((tile, index) => renderTile(tile, index))}
      </div>
      {isSolved && (
        <div className="message">Congratulations! You solved the puzzle in {currentTime} seconds!</div>)}
      </div>
    );
};


export default Game;
