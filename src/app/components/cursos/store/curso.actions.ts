import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICreateCursoData, ICurso } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const CursoActions = createActionGroup({
  source: 'Curso',
  events: {
    'Load Cursos': emptyProps(),
    'Load Cursos Success': props<{ data: ICurso[] }>(),
    'Load Cursos Failure': props<{ error: unknown }>(),

    'Create Curso': props<{ payload: ICreateCursoData }>(),
    'Create Curso Success': props<{ data: ICurso }>(),
    'Create Curso Failure': props<{ error: unknown }>(),

    'Delete Curso By Id': props<{ id: string }>(),
    'Delete Curso By Id Success': props<{ data: ICurso }>(),
    'Delete Curso By Id Failure': props<{ error: HttpErrorResponse }>(),

    'Update Curso': props<{ id: string; payload: ICurso }>(),
    'Update Curso Success': props<{ data: ICurso }>(),
    'Update Curso Failure': props<{ error: unknown }>(),
  }
});
