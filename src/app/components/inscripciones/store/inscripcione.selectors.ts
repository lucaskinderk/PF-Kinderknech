import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripcione from './inscripcione.reducer';

export const selectInscripcioneState = createFeatureSelector<fromInscripcione.State>(
  fromInscripcione.inscripcioneFeatureKey
);

export const selectIsLoading = createSelector(selectInscripcioneState, (state) => {
  return state.isLoading;
});

export const selectInscripciones = createSelector(
  selectInscripcioneState,
  (state) => state.inscripciones
);
