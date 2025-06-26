import type { Direction, UserState } from './types';

export const initialUserState: UserState = {
  x: 0,
  y: 0,
  direction: 'south',
};

export const directions: Record<Direction, [number, number]> = {
  north: [0, -1],
  east: [1, 0],
  south: [0, 1],
  west: [-1, 0],
};
