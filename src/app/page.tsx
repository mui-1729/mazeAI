'use client';
import { Board } from '../components/Board';
import { useMaze } from './hooks/useMaze';
import styles from './page.module.css';

export default function Home() {
  const { userState, board, resetBoard, seconds } = useMaze();
  return (
    <div className={styles.container}>
      <button className={styles.resetButton} onClick={resetBoard}>
        りせっと
      </button>
      <div className={styles.timer}>{seconds}秒</div>
      <Board board={board} userState={userState} />
    </div>
  );
}
