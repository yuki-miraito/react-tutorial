import React, { useState } from 'react';

import Board from './Board';
import Info from './Info';
import calculateWinner from '../utils/calculateWinner';

export default function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const firstHistory = history.slice(0, stepNumber + 1);
    const current = firstHistory[firstHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      firstHistory.concat([
        {
          squares: squares,
        }
      ])
    );
    setStepNumber(firstHistory.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const currentSquares = () => {
    const current = history[stepNumber];
    return current.squares;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares()}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <Info
          history={history}
          currentSquares={currentSquares()}
          jumpTo={jumpTo}
          xIsNext={xIsNext}
        />
      </div>
    </div>
  );
}
