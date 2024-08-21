import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../components/users/models';
import { authActions } from './auth.actions';

export interface AuthState {
  authUser: null | IUser;  
  error: unknown;
}

const initialState: AuthState = {
  authUser: null,
  error: null,
};

export const authFeatureName = 'auth';

export const authReducer = createReducer(
  initialState,

  on(authActions.login, (state) => ({
    ...state,
    error: null,
  })),

  on(authActions.loginSuccess, (state, action) => {
    if(action.data.length > 0){
      localStorage.setItem(
        'accessToken',
        'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfds'
      );
    }

    return {
      ...state,
      authUser: action.data[0],
    };

  }),

  on(authActions.loginFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(authActions.logout, () => {
    localStorage.removeItem('accessToken');
    return initialState;
  })
);
