'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

type Direction = 'west' | 'east' | 'north' | 'south';

export default function Home() {
  const [userState, setUserState] = useState<{
    x: number;
    y: number;
    direction: Direction;
    directions: Record<Direction, number[]>;
  }>({
    x: 0,
    y: 0,
    direction: 'south',
    directions: { north: [-1, 0], east: [0, 1], south: [1, 0], west: [0, -1] },
  });

  const firstBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [board, setBoard] = useState<number[][]>(firstBoard);
  const [seconds, setSeconds] = useState(0);

  let isFinished = false;

  if (userState.x === 20 && userState.y === 20) {
    isFinished = true;
  }

  const resetBoard = () => {
    mkBoard();
    isFinished = false;
    setUserState({
      x: 0,
      y: 0,
      direction: 'south',
      directions: { north: [-1, 0], east: [0, 1], south: [1, 0], west: [0, -1] },
    });
    setSeconds(0);
  };

  const mkBoard = () => {
    const newBoard = structuredClone(firstBoard);
    for (let y = 0; y < newBoard.length; y++) {
      for (let x = 0; x < newBoard[y].length; x++) {
        if (firstBoard[y][x] === 1) {
          const value = Math.floor(Math.random() * 4);
          if (value === 0 && y > 0) {
            newBoard[y - 1][x] = 1;
          } else if (value === 1 && newBoard.length - 1) {
            newBoard[y + 1][x] = 1;
          } else if (value === 2 && x > 0) {
            newBoard[y][x - 1] = 1;
          } else if (value === 3 && newBoard[y].length - 1) {
            newBoard[y][x + 1] = 1;
          }
        }
      }
    }
    setBoard(newBoard);
  };

  useEffect(() => {
    if (isFinished === true) return;
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isFinished]);

  useEffect(() => {
    mkBoard();
  }, []);

  useEffect(() => {
    if (isFinished === true || seconds === 0) return;

    setUserState((currentUserState) => {
      const { x, y, direction, directions } = currentUserState;
      const strDirections: Direction[] = ['north', 'east', 'south', 'west'];
      const currentDirection = strDirections.indexOf(direction);

      const rotate = (idx: number) => (idx + 4) % 4;

      const directionsTOTry: Direction[] = [
        strDirections[rotate(currentDirection - 1)],
        strDirections[rotate(currentDirection)],
        strDirections[rotate(currentDirection + 1)],
        strDirections[rotate(currentDirection + 2)],
      ];

      for (const nextDir of directionsTOTry) {
        const dx = directions[nextDir][1];
        const dy = directions[nextDir][0];

        if (
          dx + x >= 0 &&
          dx + x < board[0].length &&
          dy + y >= 0 &&
          dy + y < board.length &&
          board[dy + y][dx + x] === 0
        ) {
          return {
            ...currentUserState,
            x: dx + x,
            y: dy + y,
            direction: nextDir,
          };
        }
      }
    });
  }, [seconds]);

  return (
    <div className={styles.container}>
      <button className={styles.resetButton} onClick={resetBoard}>
        りせっと
      </button>
      <div className={styles.timer}>{seconds}秒</div>
      <div className={styles.board}>
        {board.map((row, y) => (
          <div key={y} className={styles.row}>
            <div>
              {row.map((cell, x) => {
                const isUser = userState.x === x && userState.y === y;
                return (
                  <div key={x} className={styles.cell}>
                    <div
                      className={styles.stone}
                      style={{ backgroundColor: cell === 1 ? 'black' : 'aqua' }}
                    >
                      {isUser && <div className={styles.player} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
