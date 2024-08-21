import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { authActions } from './auth.actions';
import { UsersService } from '../../core/usuarios/users.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(authActions.login),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.usersService.getUserByEmailAndPassword(action.payload.email!, action.payload.password!).pipe( //Se envian ambos parametros aunque JSON-SERVER solo limita la busqueda a email
          map(data => {
            if(data.length > 0){
              return authActions.loginSuccess({ data });
            }else{
              return authActions.loginFailure({ error: 'Correo o contraseña incorrectos' });
            }
          }),
          catchError(error => of(authActions.loginFailure({ error }))))
      )
    );
  });

  logout$ = createEffect(() => 
    this.actions$.pipe(
      ofType(authActions.logout),
      map(() => {
        this.router.navigate(['auth']);
        return { type: '[Auth] Logout Complete' };
      })
    ), 
    { dispatch: false }
  );

  


  constructor(private actions$: Actions, private usersService: UsersService, private router: Router) {}
}
