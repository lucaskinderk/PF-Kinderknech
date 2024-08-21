import { Component } from '@angular/core';
import { ICurso } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../../core/cursos/cursos.service';
import { CursoDetailComponent } from '../curso-detail/curso-detail.component';
import Swal from 'sweetalert2';
import { IUser } from '../../users/models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { authUser } from '../../../store/auth/auth.selectors';
import { selectCursos, selectIsLoading } from '../store/curso.selectors';
import { CursoActions } from '../store/curso.actions';

@Component({
  selector: 'app-list-cursos',
  templateUrl: './list-cursos.component.html',
  styleUrl: './list-cursos.component.scss'
})
export class ListCursosComponent {
  authUser$: Observable<IUser | null>;
  cursos: ICurso[] = [];
  loading = false;

  loadingCursos$: Observable<boolean>;
  cursos$: Observable<ICurso[]>;

  displayedColumns: string[] = [
    'id',
    'nombre',
    'cantHs',
    'cantClases',
    'tutor',
    'actions'
  ];

  constructor(private matDialog: MatDialog, private cursosService: CursosService, private store: Store) {
    this.authUser$ = this.store.select(authUser);
    this.cursos$ = this.store.select(selectCursos);
    this.loadingCursos$ = this.store.select(selectIsLoading);
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadCursos();
  }

  loadCursos() {
    this.store.dispatch(CursoActions.loadCursos());
  }

  openDialog(editCurso?: ICurso, editMode?: boolean): void {
    this.matDialog
      .open(CursoDetailComponent, {
        data: {editCurso , editMode},
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editCurso) {
              this.store.dispatch( CursoActions.updateCurso({id:editCurso.id, payload: result}));
            } else {
              result.createdAt = new Date();
              this.store.dispatch( CursoActions.createCurso({payload: result}));
            }
          }
        },
      });
  }

  onDeleteCurso(id: string): void {
    Swal.fire({
      title: "Esta seguro de eliminar el curso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch( CursoActions.deleteCursoById({id}));
      }
    });
  }
}
