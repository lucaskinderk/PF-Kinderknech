import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { UserActions } from './user.actions';
import { UsersService } from '../../../core/usuarios/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.loadUsers),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.usersService.getUsers().pipe(
          map(data => UserActions.loadUsersSuccess({ data })),
          catchError(error => of(UserActions.loadUsersFailure({ error }))))
      )
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.createUser),
      concatMap((action) =>
        this.usersService.createUser(action.payload).pipe(
          map((data) => UserActions.createUserSuccess({ data })),
          catchError((error) =>
            of(UserActions.createUserFailure({ error }))
          )
        )
      )
    );
  });

  deleteUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUserById),
      concatMap((action) =>
        this.usersService.deleteUser(action.id).pipe(
          map((data) => UserActions.deleteUserByIdSuccess({ data })),
          catchError((error) =>
            of(UserActions.deleteUserByIdFailure({ error }))
          )
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      concatMap((action) =>
        this.usersService.updateUser(action.id,action.payload).pipe(
          map((data) => UserActions.updateUserSuccess({ data })),
          catchError((error) =>
            of(UserActions.updateUserFailure({ error }))
          )
        )
      )
    );
  });

  onErrors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          UserActions.loadUsersFailure,
          UserActions.createUserFailure,
          UserActions.updateUserFailure,
          UserActions.deleteUserByIdFailure
        ),
        tap((action) => {
          if (action.error instanceof HttpErrorResponse) {
            Swal.fire({
              icon: 'error',
              text: action.error['message'],
            });
          }
        })
      );
    },
    { dispatch: false }
  );


  constructor(private actions$: Actions, private usersService: UsersService) {}
}
