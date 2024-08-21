import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCurso from './curso.reducer';

export const selectCursoState = createFeatureSelector<fromCurso.State>(
  fromCurso.cursoFeatureKey
);

export const selectIsLoading = createSelector(selectCursoState, (state) => {
  return state.isLoading;
});

export const selectCursos = createSelector(
  selectCursoState,
  (state) => state.cursos
);

