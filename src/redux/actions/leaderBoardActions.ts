import { UPDATE_SCORE, UPDATE_USER } from './actionTypes';
import { IUser } from '../types';

export const updateScore = (score: number) => {
  return {
    type: UPDATE_SCORE,
    payload: score
  };
};

export const updateUser = (user: IUser) => {
  return {
    type: UPDATE_USER,
    payload: user
  };
};