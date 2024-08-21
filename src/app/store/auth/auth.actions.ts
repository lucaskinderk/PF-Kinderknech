import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginData } from '../../components/auth/models';
import { IUser } from '../../components/users/models';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'login': props<{ payload: LoginData }>(),
    'login Success': props<{ data: IUser[] }>(),
    'login failure': props<{ error: unknown }>(),
    logout: emptyProps(),
  },
});
