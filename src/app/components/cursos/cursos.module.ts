import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListCursosComponent } from './list-cursos/list-cursos.component';
import { CursoDetailComponent } from './curso-detail/curso-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { CursoEffects } from './store/curso.effects';
import { StoreModule } from '@ngrx/store';
import { cursoFeature } from './store/curso.reducer';
import { inscripcioneFeature } from '../inscripciones/store/inscripcione.reducer';
import { InscripcioneEffects } from '../inscripciones/store/inscripcione.effects';


@NgModule({
  declarations: [
    ListCursosComponent,
    CursoDetailComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule,
    StoreModule.forFeature(cursoFeature),
    StoreModule.forFeature(inscripcioneFeature),
    EffectsModule.forFeature([CursoEffects, InscripcioneEffects])
  ]
})
export class CursosModule { }
