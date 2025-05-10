import { combineReducers } from 'redux';
import formReducer from './formReducer';
import leaderBoardReducer from './leaderBoardReducer';

const rootReducer = combineReducers({
  form: formReducer,
  leaderboard: leaderBoardReducer
});

export default rootReducer;