export interface FormState {
    category: string;
    difficulty: string;
    type: string;
    amount: string;
  }
  
  export interface RootState {
    form: FormState;
  }