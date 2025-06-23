'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

type Direction = 'west' | 'east' | 'north' | 'south';
type UserState = {
  x: number;
  y: number;
  direction: Direction;
};

const initialUserState: UserState = {
  x: 0,
  y: 0,
  direction: 'south',
};

const directions: Record<Direction, [number, number]> = {
  north: [0, -1],
  east: [1, 0],
  south: [0, 1],
  west: [-1, 0],
};

const createInitialBoard = (): number[][] => {
  const board: number[][] = [];
  for (let y = 0; y < 21; y++) {
    const row: number[] = [];
    for (let x = 0; x < 21; x++) {
      row.push(y % 2 === 1 && x % 2 === 1 ? 1 : 0);
    }
    board.push(row);
  }
  return board;
};

const expandBoard = (baseBoard: number[][]): number[][] => {
  const newBoard = [...baseBoard];

  for (let y = 0; y < baseBoard.length; y++) {
    for (let x = 0; x < baseBoard[y].length; x++) {
      if (baseBoard[y][x] === 1) {
        const dir = Math.floor(Math.random() * 4);
        if (dir === 0 && y > 0) {
          newBoard[y - 1][x] = 1;
        } else if (dir === 1 && y < baseBoard.length - 1) {
          newBoard[y + 1][x] = 1;
        } else if (dir === 2 && x > 0) {
          newBoard[y][x - 1] = 1;
        } else if (dir === 3 && x < baseBoard[y].length - 1) {
          newBoard[y][x + 1] = 1;
        }
      }
    }
  }

  return newBoard;
};

const getNextDirection = (currentDirection: Direction): Direction[] => {
  const directionsOrder: Direction[] = ['north', 'east', 'south', 'west'];
  const index = directionsOrder.indexOf(currentDirection);

  return [
    directionsOrder[(index + 1) % 4],
    directionsOrder[index],
    directionsOrder[(index + 3) % 4],
    directionsOrder[(index + 2) % 4],
  ];
};

const canMove = (x: number, y: number, board: number[][]): boolean => {
  return y >= 0 && y < board.length && x >= 0 && x < board[0].length && board[y][x] === 0;
};

const updateUserPosition = (state: UserState, board: number[][]): UserState => {
  const tryDirections = getNextDirection(state.direction);

  for (const dir of tryDirections) {
    const [dy, dx] = directions[dir];
    const newX = state.x + dx;
    const newY = state.y + dy;

    if (canMove(newX, newY, board)) {
      return { ...state, x: newX, y: newY, direction: dir };
    }
  }

  return state;
};

const mkBoard = (): number[][] => {
  return expandBoard(createInitialBoard());
};

export default function Home() {
  const [userState, setUserState] = useState<UserState>(initialUserState);

  const [board, setBoard] = useState<number[][]>([]);
  const [seconds, setSeconds] = useState(0);

  let isFinished = userState.x === 20 && userState.y === 20;

  useEffect(() => {
    setBoard(mkBoard());
  }, []);

  const resetBoard = () => {
    setBoard(mkBoard());
    isFinished = false;
    setSeconds(0);
    setUserState(initialUserState);
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
    if (isFinished === true || seconds === 0) return;
    setUserState((currentUserState) => updateUserPosition(currentUserState, board));
  }, [board, isFinished, seconds]);

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
                      {isUser && (
                        <div className={styles.player}>
                          {userState.direction === 'east'
                            ? '→'
                            : userState.direction === 'west'
                              ? '←'
                              : userState.direction === 'north'
                                ? '↑'
                                : '↓'}
                        </div>
                      )}
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
