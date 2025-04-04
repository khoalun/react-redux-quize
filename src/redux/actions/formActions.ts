import { UPDATE_FORM_DATA, RESET_FORM_DATA } from './actionTypes';
import { FormState } from '../types';


export interface UpdateFormDataAction {
  type: typeof UPDATE_FORM_DATA;
  payload: Partial<FormState>;
}

export interface ResetFormDataAction {
  type: typeof RESET_FORM_DATA;
}


export type FormActionTypes = UpdateFormDataAction | ResetFormDataAction;


export const updateFormData = (data: FormState) => {
  return {
    type: UPDATE_FORM_DATA,
    payload: data
  };
};

export const resetFormData = () => {
  return {
    type: RESET_FORM_DATA
  };
};