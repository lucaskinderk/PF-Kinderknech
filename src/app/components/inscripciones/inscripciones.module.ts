import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesComponent } from './inscripciones.component';
import { EffectsModule } from '@ngrx/effects';
import { InscripcioneEffects } from './store/inscripcione.effects';
import { Store, StoreModule } from '@ngrx/store';
import { inscripcioneFeature } from './store/inscripcione.reducer';
import { SharedModule } from '../../shared/shared.module';
import { AlumnoEffects } from '../alumnos/store/alumno.effects';
import { CursoEffects } from '../cursos/store/curso.effects';
import { alumnoFeature } from '../alumnos/store/alumno.reducer';
import { cursoFeature } from '../cursos/store/curso.reducer';


@NgModule({
  declarations: [
    InscripcionesComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    SharedModule,
    StoreModule.forFeature(inscripcioneFeature),
    StoreModule.forFeature( alumnoFeature),
    StoreModule.forFeature(cursoFeature),
    EffectsModule.forFeature([InscripcioneEffects, AlumnoEffects, CursoEffects])
  ]
})
export class InscripcionesModule { }
