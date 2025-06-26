import { directions } from '../constants';
import type { Direction, UserState } from '../types';

export const createInitialBoard = (): number[][] => {
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

export const expandBoard = (baseBoard: number[][]): number[][] => {
  const newBoard = structuredClone(baseBoard);

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
        console.log(newBoard);
      }
    }
  }

  return newBoard;
};

export const getNextDirection = (currentDirection: Direction): Direction[] => {
  const directionsOrder: Direction[] = ['north', 'east', 'south', 'west'];
  const index = directionsOrder.indexOf(currentDirection);

  return [
    directionsOrder[(index + 1) % 4],
    directionsOrder[index],
    directionsOrder[(index + 3) % 4],
    directionsOrder[(index + 2) % 4],
  ];
};

export const canMove = (x: number, y: number, board: number[][]): boolean => {
  return y >= 0 && y < board.length && x >= 0 && x < board[0].length && board[y][x] === 0;
};

export const updateUserPosition = (state: UserState, board: number[][]): UserState => {
  const tryDirections = getNextDirection(state.direction);

  for (const dir of tryDirections) {
    const [dx, dy] = directions[dir];
    const newX = state.x + dx;
    const newY = state.y + dy;

    if (canMove(newX, newY, board)) {
      return { ...state, x: newX, y: newY, direction: dir };
    }
  }

  return state;
};

export const mkBoard = (): number[][] => {
  return expandBoard(createInitialBoard());
};
