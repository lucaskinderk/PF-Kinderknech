import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectUserList = createSelector(selectUserState, (u)=> u.users);

export const selectLoadingUsers = createSelector(selectUserState, (u) => u.loadingUsers)
 
