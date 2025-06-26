import React from 'react';
import styles from '../app/page.module.css';
import type { Direction } from '../types';

type CellProps = {
  cellType: number;
  isUserHere: boolean;
  direction: Direction;
};

const CellComponent = ({ cellType, isUserHere, direction }: CellProps) => {
  return (
    <div className={styles.cell}>
      <div className={styles.stone} style={{ backgroundColor: cellType === 1 ? 'black' : 'aqua' }}>
        {isUserHere && (
          <div className={styles.player}>
            {direction === 'east'
              ? '→'
              : direction === 'west'
                ? '←'
                : direction === 'north'
                  ? '↑'
                  : '↓'}
          </div>
        )}
      </div>
    </div>
  );
};

export const Cell = React.memo(CellComponent);
