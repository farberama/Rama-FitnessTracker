import { User } from './user.model';
import * as AuthActions from '../auth/auth.actions';

export interface State {
  isAuthenticated: boolean;
  user: User;
}

const initialState: State = {
  isAuthenticated: false,
  user: null
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload }
      };
    case AuthActions.SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getUser = (state: State) => state.user;
