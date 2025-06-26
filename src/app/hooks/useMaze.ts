import { useEffect, useState } from 'react';
import { initialUserState } from '../../constants';
import type { UserState } from '../../types';
import { mkBoard, updateUserPosition } from '../../utlis/mazeLogic';

export const useMaze = () => {
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

  return {
    userState,
    board,
    seconds,
    resetBoard,
  };
};
