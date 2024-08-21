import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { IUser } from '../models';

export const userFeatureKey = 'user';

export interface State {
  loadingUsers: boolean;
  users: IUser[];
  error: unknown;
}

export const initialState: State = {
  loadingUsers: false,
  users: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => {
    return { 
      ...state,
      loadingUsers: true
    };
  }),
  on(UserActions.loadUsersSuccess, (state, action) => {
    return { 
      ...state,
      users: action.data,
      loadingUsers: false
    };
  }),
  on(UserActions.loadUsersFailure, (state, action) => {
    return { 
      ...state,
      error: action.error,
      loadingUsers: false
    };
  }),

  on(UserActions.createUser, (state) =>  {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(UserActions.createUserSuccess, (state, action) =>  {
    return {
      ...state,
      isLoading: false,
      users: [...state.users, action.data],
    };
  }),

  on(UserActions.createUserFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(UserActions.deleteUserById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.deleteUserByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: state.users.filter((el) => el.id !== action.data.id),
  })),
  on(UserActions.deleteUserByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(UserActions.updateUser, (state) =>  {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(UserActions.updateUserSuccess, (state, action) =>  {
    return {
      ...state,
      isLoading: false,
      users: state.users.map(user => user.id === action.data.id ? action.data : user),
    };
  }),

  on(UserActions.updateUserFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

