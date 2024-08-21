import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authFeatureName, authReducer } from './auth/auth.reducer';

interface RootState {}

export const rootReducer: ActionReducerMap<RootState> = {
  [authFeatureName]: authReducer,
};
