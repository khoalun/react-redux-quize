import { UPDATE_SCORE, UPDATE_USER } from '../actions/actionTypes';
import { LeaderboardState } from '../types';

const initialState: LeaderboardState = {
  score: 0,
  users: []
};

const leaderBoardReducer = (
  state: LeaderboardState = initialState, 
  action: any
): LeaderboardState => {
  switch (action.type) {
    case UPDATE_SCORE:
      return {
        ...state,
        score: state.score + action.payload
      };
    case UPDATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    default:
      return state;
  }
};

export default leaderBoardReducer;