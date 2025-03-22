import { UPDATE_FORM_DATA, RESET_FORM_DATA } from '../actions/actionTypes';
import { FormState } from '../types';
import { FormActionTypes } from '../actions/formActions';

const initialState: FormState = {
  category: 'Entertainment: Film',
  difficulty: 'easy',
  type: 'multiple',
  amount: '10'
};


const formReducer = (
  state: FormState = initialState, 
  action: FormActionTypes
): FormState => {
  switch (action.type) {
    case UPDATE_FORM_DATA:
      return {
        ...state,
        ...action.payload
      };
    case RESET_FORM_DATA:
      return initialState;
    default:
      return state;
  }
};

export default formReducer;