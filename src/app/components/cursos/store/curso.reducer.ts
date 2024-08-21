import { createFeature, createReducer, on } from '@ngrx/store';
import { CursoActions } from './curso.actions';
import { ICurso } from '../models';

export const cursoFeatureKey = 'curso';

export interface State {
  cursos: ICurso[];
  isLoading: boolean;  
  error: unknown;
}

export const initialState: State = {
  cursos: [],
  isLoading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(CursoActions.loadCursos, state => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CursoActions.loadCursosSuccess, (state, action) =>  {
    return {
      ...state,
      isLoading: false,
      cursos: action.data,
    };
  }),
  on(CursoActions.loadCursosFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),

  on(CursoActions.createCurso, (state) =>  {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(CursoActions.createCursoSuccess, (state, action) =>  {
    return {
      ...state,
      isLoading: false,
      cursos: [...state.cursos, action.data],
    };
  }),

  on(CursoActions.createCursoFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(CursoActions.deleteCursoById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(CursoActions.deleteCursoByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    cursos: state.cursos.filter((el) => el.id !== action.data.id),
  })),
  on(CursoActions.deleteCursoByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(CursoActions.updateCurso, (state) =>  {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(CursoActions.updateCursoSuccess, (state, action) =>  {
    return {
      ...state,
      isLoading: false,
      cursos: state.cursos.map(curso => curso.id === action.data.id ? action.data : curso),
    };
  }),

  on(CursoActions.updateCursoFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
);

export const cursoFeature = createFeature({
  name: cursoFeatureKey,
  reducer,
});

