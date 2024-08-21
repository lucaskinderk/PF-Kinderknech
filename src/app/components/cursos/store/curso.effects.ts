import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CursoActions } from './curso.actions';
import { CursosService } from '../../../core/cursos/cursos.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Injectable()
export class CursoEffects {

  loadCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursoActions.loadCursos),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.cursosService.getCursos().pipe(
          map(data => CursoActions.loadCursosSuccess({ data })),
          catchError(error => of(CursoActions.loadCursosFailure({ error }))))
      )
    );
  });

  createCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursoActions.createCurso),
      concatMap((action) =>
        this.cursosService.createCurso(action.payload).pipe(
          map((data) => CursoActions.createCursoSuccess({ data })),
          catchError((error) =>
            of(CursoActions.createCursoFailure({ error }))
          )
        )
      )
    );
  });

  deleteCursoById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursoActions.deleteCursoById),
      concatMap((action) =>
        this.cursosService.deleteCurso(action.id).pipe(
          map((data) => CursoActions.deleteCursoByIdSuccess({ data })),
          catchError((error) =>
            of(CursoActions.deleteCursoByIdFailure({ error }))
          )
        )
      )
    );
  });

  updateCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursoActions.updateCurso),
      concatMap((action) =>
        this.cursosService.updateCurso(action.id,action.payload).pipe(
          map((data) => CursoActions.updateCursoSuccess({ data })),
          catchError((error) =>
            of(CursoActions.updateCursoFailure({ error }))
          )
        )
      )
    );
  });

  onErrors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CursoActions.loadCursosFailure,
          CursoActions.createCursoFailure,
          CursoActions.updateCursoFailure,
          CursoActions.deleteCursoByIdFailure
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


  constructor(private actions$: Actions, private cursosService: CursosService) {}
}
