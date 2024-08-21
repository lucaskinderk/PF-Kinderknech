import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcioneActions } from './inscripcione.actions';
import { IInscripcion } from '../models';

export const inscripcioneFeatureKey = 'inscripcione';

export interface State {
  inscripciones: IInscripcion[];
  isLoading: boolean;  
  error: unknown;
}

export const initialState: State = {
  inscripciones: [],
  isLoading: false,  
  error: null
};

export const reducer = createReducer(
  initialState,
  on(InscripcioneActions.loadInscripciones, state => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(InscripcioneActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      inscripciones: action.data,
    };
  }),
  on(InscripcioneActions.loadInscripcionesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),

  on(InscripcioneActions.createInscripcion, (state) =>  {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(InscripcioneActions.createInscripcionSuccess, (state, action) =>  {
    return {
      ...state,
      isLoading: false,
      inscripciones: [...state.inscripciones, action.data],
    };
  }),

  on(InscripcioneActions.createInscripcionFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(InscripcioneActions.deleteInscripcionById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(InscripcioneActions.deleteInscripcionByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    inscripciones: state.inscripciones.filter((el) => el.id !== action.data.id),
  })),
  on(InscripcioneActions.deleteInscripcionByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InscripcioneActions.loadInscripcionesByStudentId, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(InscripcioneActions.loadInscripcionesByStudentIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    inscripciones: action.data,
  })),
  on(InscripcioneActions.loadInscripcionesByStudentIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InscripcioneActions.loadInscripcionesByCourseId, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(InscripcioneActions.loadInscripcionesByCourseIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    inscripciones: action.data,
  })),
  on(InscripcioneActions.loadInscripcionesByCourseIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))


);

export const inscripcioneFeature = createFeature({
  name: inscripcioneFeatureKey,
  reducer,
});

