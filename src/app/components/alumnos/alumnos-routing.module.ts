import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAlumnosComponent } from './list-alumnos/list-alumnos.component';
import { AlumnoDetailComponent } from './alumno-detail/alumno-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Listado de alumnos',
    },
    component: ListAlumnosComponent,
  },
  {
    path: ':id',
    component: AlumnoDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
