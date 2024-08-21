import { createFeature, createReducer, on } from '@ngrx/store';
import { AlumnoActions } from './alumno.actions';
import { IAlumno } from '../models';

export const alumnoFeatureKey = 'alumno';

export interface State {
  alumnos: IAlumno[];
  isLoading: boolean;  
  error: unknown;
}

export const initialState: State = {
  alumnos: [],
  isLoading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(AlumnoActions.loadAlumnos, state => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(AlumnoActions.loadAlumnosSuccess, (state, action) =>  {
    return {
      ...state,
      isLoading: false,
      alumnos: action.data,
    };
  }),
  on(AlumnoActions.loadAlumnosFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),

  on(AlumnoActions.createAlumno, (state) =>  {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(AlumnoActions.createAlumnoSuccess, (state, action) =>  {
    return {
      ...state,
      isLoading: false,
      alumnos: [...state.alumnos, action.data],
    };
  }),

  on(AlumnoActions.createAlumnoFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(AlumnoActions.deleteAlumnoById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AlumnoActions.deleteAlumnoByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    alumnos: state.alumnos.filter((el) => el.id !== action.data.id),
  })),
  on(AlumnoActions.deleteAlumnoByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(AlumnoActions.updateAlumno, (state) =>  {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(AlumnoActions.updateAlumnoSuccess, (state, action) =>  {
    return {
      ...state,
      isLoading: false,
      alumnos: state.alumnos.map(alumno => alumno.id === action.data.id ? action.data : alumno),
    };
  }),

  on(AlumnoActions.updateAlumnoFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
);

export const alumnoFeature = createFeature({
  name: alumnoFeatureKey,
  reducer,
});

