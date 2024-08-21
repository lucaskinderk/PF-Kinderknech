import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AlumnoActions } from './alumno.actions';
import { AlumnosService } from '../../../core/alumnos/alumnos.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AlumnoEffects {

  loadAlumnos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AlumnoActions.loadAlumnos),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.alumnosService.getAlumnos().pipe(
          map(data => AlumnoActions.loadAlumnosSuccess({ data })),
          catchError(error => of(AlumnoActions.loadAlumnosFailure({ error }))))
      )
    );
  });

  createAlumno$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnoActions.createAlumno),
      concatMap((action) =>
        this.alumnosService.createAlumnos(action.payload).pipe(
          map((data) => AlumnoActions.createAlumnoSuccess({ data })),
          catchError((error) =>
            of(AlumnoActions.createAlumnoFailure({ error }))
          )
        )
      )
    );
  });

  deleteAlumnoById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnoActions.deleteAlumnoById),
      concatMap((action) =>
        this.alumnosService.deleteAlumnos(action.id).pipe(
          map((data) => AlumnoActions.deleteAlumnoByIdSuccess({ data })),
          catchError((error) =>
            of(AlumnoActions.deleteAlumnoByIdFailure({ error }))
          )
        )
      )
    );
  });

  updateAlumno$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnoActions.updateAlumno),
      concatMap((action) =>
        this.alumnosService.updateAlumnos(action.id,action.payload).pipe(
          map((data) => AlumnoActions.updateAlumnoSuccess({ data })),
          catchError((error) =>
            of(AlumnoActions.updateAlumnoFailure({ error }))
          )
        )
      )
    );
  });

  onErrors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          AlumnoActions.loadAlumnosFailure,
          AlumnoActions.createAlumnoFailure,
          AlumnoActions.updateAlumnoFailure,
          AlumnoActions.deleteAlumnoByIdFailure
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


  constructor(private actions$: Actions, private alumnosService: AlumnosService) {}
}
