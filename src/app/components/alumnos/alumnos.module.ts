import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnoDetailComponent } from './alumno-detail/alumno-detail.component';
import { ListAlumnosComponent } from './list-alumnos/list-alumnos.component';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { AlumnoEffects } from './store/alumno.effects';
import { StoreModule } from '@ngrx/store';
import { alumnoFeature } from './store/alumno.reducer';
import { inscripcioneFeature } from '../inscripciones/store/inscripcione.reducer';
import { InscripcioneEffects } from '../inscripciones/store/inscripcione.effects';


@NgModule({
  declarations: [
    AlumnoDetailComponent,
    ListAlumnosComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule,
    StoreModule.forFeature(alumnoFeature),
    StoreModule.forFeature(inscripcioneFeature),
    EffectsModule.forFeature([AlumnoEffects, InscripcioneEffects])
  ],
  exports:[
    ListAlumnosComponent
  ]
})
export class AlumnosModule { }
