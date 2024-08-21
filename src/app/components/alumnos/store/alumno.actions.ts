import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAlumno } from '../models';
import { ICreateAlumnoData } from '../models/index';
import { HttpErrorResponse } from '@angular/common/http';

export const AlumnoActions = createActionGroup({
  source: 'Alumno',
  events: {
    'Load Alumnos': emptyProps(),
    'Load Alumnos Success': props<{ data: IAlumno[] }>(),
    'Load Alumnos Failure': props<{ error: unknown }>(),

    'Create Alumno': props<{ payload: ICreateAlumnoData }>(),
    'Create Alumno Success': props<{ data: IAlumno }>(),
    'Create Alumno Failure': props<{ error: unknown }>(),

    'Delete Alumno By Id': props<{ id: string }>(),
    'Delete Alumno By Id Success': props<{ data: IAlumno }>(),
    'Delete Alumno By Id Failure': props<{ error: HttpErrorResponse }>(),

    'Update Alumno': props<{ id: string; payload: IAlumno }>(),
    'Update Alumno Success': props<{ data: IAlumno }>(),
    'Update Alumno Failure': props<{ error: unknown }>(),
  }
});
