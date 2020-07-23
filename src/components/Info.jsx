import React from 'react';

import calculateWinner from '../utils/calculateWinner';

export default function Info(props) {
  const history = props.history;
  const moves = history.map((_, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => props.jumpTo(move)}>
          {desc}
        </button>
      </li>
    )
  })

  const status = () => {
    const winner = calculateWinner(props.currentSquares);
    const xIsNext = props.xIsNext;

    return winner ?
      `Winner: ${winner}` :
      `Next player: ${(xIsNext ? 'X' : 'O')}`
  }

  return(
    <div>
      <div>{(status())}</div>
      <ol>{moves}</ol>
    </div>
  );
}
