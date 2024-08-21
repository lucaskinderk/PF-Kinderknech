import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcioneActions } from './inscripcione.actions';
import { InscripcionesService } from '../../../core/inscripciones/inscripciones.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class InscripcioneEffects {

  loadInscripciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcioneActions.loadInscripciones),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.inscripcionesService.getInscripciones().pipe(
          map(data => InscripcioneActions.loadInscripcionesSuccess({ data })),
          catchError(error => of(InscripcioneActions.loadInscripcionesFailure({ error }))))
      )
    );
  });

  createInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcioneActions.createInscripcion),
      concatMap((action) =>
        this.inscripcionesService.createInscripcion(action.payload).pipe(
          map((data) => InscripcioneActions.createInscripcionSuccess({ data })),
          catchError((error) =>
            of(InscripcioneActions.createInscripcionFailure({ error }))
          )
        )
      )
    );
  });

  createInscripcionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcioneActions.createInscripcionSuccess),
      switchMap(() => [
        InscripcioneActions.loadInscripciones()
      ])
    )
  );

  deleteInscripcionById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcioneActions.deleteInscripcionById),
      concatMap((action) =>
        this.inscripcionesService.deleteInscripcionById(action.id).pipe(
          map((data) => InscripcioneActions.deleteInscripcionByIdSuccess({ data })),
          catchError((error) =>
            of(InscripcioneActions.deleteInscripcionByIdFailure({ error }))
          )
        )
      )
    );
  });

  loadInscripcionesByStudentId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcioneActions.loadInscripcionesByStudentId),
      concatMap((action) =>
        this.inscripcionesService.getInscripcionesByStudentId(action.id).pipe(
          map((data) => InscripcioneActions.loadInscripcionesByStudentIdSuccess({ data })),
          catchError((error) =>
            of(InscripcioneActions.loadInscripcionesByStudentIdFailure({ error }))
          )
        )
      )
    );
  });

  loadInscripcionesByCourseId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcioneActions.loadInscripcionesByCourseId),
      concatMap((action) =>
        this.inscripcionesService.getInscripcionesByCourseId(action.id).pipe(
          map((data) => InscripcioneActions.loadInscripcionesByCourseIdSuccess({ data })),
          catchError((error) =>
            of(InscripcioneActions.loadInscripcionesByCourseIdFailure({ error }))
          )
        )
      )
    );
  });

  onErrors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          InscripcioneActions.loadInscripcionesFailure,
          InscripcioneActions.createInscripcionFailure,
          InscripcioneActions.deleteInscripcionByIdFailure,
          InscripcioneActions.loadInscripcionesByStudentIdFailure,
          InscripcioneActions.loadInscripcionesByCourseIdFailure
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


  constructor(private actions$: Actions, private inscripcionesService: InscripcionesService) {}
}
