export interface FormState {
    category: string;
    difficulty: string;
    type: string;
    amount: number;
  }
  
  export interface RootState {
    form: FormState;
    leaderboard: LeaderboardState
  }

  export interface IUser {
    firstName: string,
    lastName: string,
    email: string
    id: number,
    score: number
  }
  export interface LeaderboardState {
    score: number,
    users: IUser[]
  }