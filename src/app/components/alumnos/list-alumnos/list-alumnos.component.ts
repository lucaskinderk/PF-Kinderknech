import { Component, OnInit } from '@angular/core';
import { IAlumno } from '../models';
import { AlumnoDetailComponent } from '../alumno-detail/alumno-detail.component';

import { MatDialog } from '@angular/material/dialog';
import { AlumnosService } from '../../../core/alumnos/alumnos.service';
import { isNgTemplate } from '@angular/compiler';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { IUser } from '../../users/models';
import { Store } from '@ngrx/store';
import { authUser } from '../../../store/auth/auth.selectors';
import { selectAlumnos, selectIsLoading } from '../store/alumno.selectors';
import { AlumnoActions } from '../store/alumno.actions';

@Component({
  selector: 'app-list-alumnos',
  templateUrl: './list-alumnos.component.html',
  styleUrl: './list-alumnos.component.scss'
})
export class ListAlumnosComponent implements OnInit{
  authUser$: Observable<IUser | null>;
  alumnos: IAlumno[] = [];

  loadingAlumnos$: Observable<boolean>;
  alumnos$: Observable<IAlumno[]>;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'email',
    'gender',
    'perfil',
    'actions',
  ];

  constructor(private matDialog: MatDialog, private alumnosService: AlumnosService, 
    private store: Store) {
      this.authUser$ = this.store.select(authUser);
      this.alumnos$ = this.store.select(selectAlumnos);
      this.loadingAlumnos$ = this.store.select(selectIsLoading);
    }

  ngOnInit(): void {
    this.loadAlumnos();
  }

  loadAlumnos() {
    this.store.dispatch( AlumnoActions.loadAlumnos());
  }

  openDialog(editAlumno?: IAlumno, editMode?: boolean): void {
    this.matDialog
      .open(AlumnoDetailComponent, {
        data: {editAlumno, editMode},
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editAlumno) {
              this.store.dispatch(AlumnoActions.updateAlumno({id:editAlumno.id, payload:result}))
            } else {
              result.createdAt = new Date();
              this.store.dispatch( AlumnoActions.createAlumno({payload: result}));
            }
          }
        },
      });
  }

  onDeleteUser(id: string): void {
    Swal.fire({
      title: "Esta seguro de eliminar el alumno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(AlumnoActions.deleteAlumnoById({id}));
      }
    });
  }
}
