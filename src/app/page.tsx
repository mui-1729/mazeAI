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
    directions: { east: [0, 1], north: [-1, 0], west: [0, -1], south: [1, 0] },
  });

  const turnRight: Record<Direction, Direction> = {
    north: 'west',
    east: 'north',
    south: 'east',
    west: 'south',
  };

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

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      setSeconds(0);
    };
  }, [board]);

  const resetHandler = () => {
    const copyBoard = structuredClone(firstBoard);
    const newBoard = structuredClone(copyBoard);
    for (let y = 0; y < newBoard.length; y++) {
      for (let x = 0; x < newBoard[y].length; x++) {
        if (copyBoard[y][x] === 1) {
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
    setUserState({
      x: 0,
      y: 0,
      direction: 'south',
      directions: { east: [0, 1], north: [-1, 0], west: [0, -1], south: [1, 0] },
    });
  };

  useEffect(() => {
    resetHandler();
  }, []);

  const nextMass = () => {
    const { x, y, direction, directions } = userState;
    const strDirections: Direction[] = ['north', 'east', 'south', 'west'];
    const currentDirection = strDirections.indexOf(direction);

    const rotate = (idx: number) => (idx + 4) % 4;

    const rightDir = strDirections[rotate(currentDirection + 1)];
    const [rightDx, rightDy] = directions[rightDir];
    const rightX = x + rightDx;
    const rightY = y + rightDy;
    console.log(rightDir);

    if (
      rightX >= 0 &&
      rightX < board[0].length &&
      rightY >= 0 &&
      rightY < board.length &&
      board[rightY][rightX] !== 1
    ) {
      setUserState((prev) => ({
        ...prev,
        direction: rightDir,
        x: rightX,
        y: rightY,
      }));
      return;
    }

    const [dx, dy] = directions[direction];
    const frontX = x + dx;
    const frontY = y + dy;

    if (
      frontX >= 0 &&
      frontX < board[0].length &&
      frontY >= 0 &&
      frontY < board.length &&
      board[frontY][frontX] !== 1
    ) {
      setUserState((prev) => ({
        ...prev,
        x: frontX,
        y: frontY,
      }));
      return;
    }

    const leftDir = strDirections[rotate(currentDirection - 1)];
    setUserState((prev) => ({
      ...prev,
      direction: leftDir,
    }));
  };

  useEffect(() => {
    nextMass();
  }, [seconds]);

  return (
    <div className={styles.container}>
      <button onClick={() => resetHandler()}>りせっと</button>
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
