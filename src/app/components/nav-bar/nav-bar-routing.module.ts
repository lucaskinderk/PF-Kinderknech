import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Inicio',
    },
    component: HomeComponent
  },
  {
    path: 'home',
    data: {
      title: 'Inicio',
    },
    loadChildren: () => import('../home/home.module').then( (m) => m.HomeModule),    
  },
   {
    path: 'alumnos',
    data: {
      title: 'Listado de alumnos',
    },    
    loadChildren: () =>
      import('../alumnos/alumnos.module').then(
        (m) => m.AlumnosModule
      ),
  },  
  {
    path: 'cursos',
    data: {
      title: 'Listado de cursos',
    },
    loadChildren: () =>
      import('../cursos/cursos.module').then(
        (m) => m.CursosModule
      ),
  },
  {
    path: 'clases',
    loadChildren: () =>
      import('../clases/clases.module').then(
        (m) => m.ClasesModule
      ),
  },
  {
    path: 'usuarios',
    data: {
      title: 'Listado de usuarios',
    },
    canActivate: [adminGuard],
    loadChildren: () =>
      import('../users/users.module').then(
        (m) => m.UsersModule
      ),
  },
  {
    path: 'inscripciones',
    data: {
      title: 'Listado de inscripciones',
    },
    loadChildren: () =>
      import('../inscripciones/inscripciones.module').then(
        (m) => m.InscripcionesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavBarRoutingModule { }
