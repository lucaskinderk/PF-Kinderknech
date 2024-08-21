import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateUserPayload, IUser } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: IUser[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),

    'Create User': props<{ payload: CreateUserPayload }>(),
    'Create User Success': props<{ data: IUser }>(),
    'Create User Failure': props<{ error: unknown }>(),

    'Delete User By Id': props<{ id: string }>(),
    'Delete User By Id Success': props<{ data: IUser }>(),
    'Delete User By Id Failure': props<{ error: HttpErrorResponse }>(),

    'Update User': props<{ id: string; payload: IUser }>(),
    'Update User Success': props<{ data: IUser }>(),
    'Update User Failure': props<{ error: unknown }>(),
  }
});
