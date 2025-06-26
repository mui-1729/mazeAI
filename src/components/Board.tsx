import styles from '../app/page.module.css';
import type { UserState } from '../types';
import { Cell } from './Cell';

type BoardProps = {
  board: number[][];
  userState: UserState;
};

export const Board = ({ board, userState }: BoardProps) => {
  return (
    <div className={styles.board}>
      {board.map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((cellValue, x) => {
            const isUserHere = userState.x === x && userState.y === y;
            return (
              <Cell
                key={`${x}-${y}`}
                cellType={cellValue}
                isUserHere={isUserHere}
                direction={userState.direction}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
