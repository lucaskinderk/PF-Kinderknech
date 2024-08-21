import { Component, OnDestroy, OnInit } from '@angular/core';
import { InscripcionesService } from '../../core/inscripciones/inscripciones.service';
import { Store } from '@ngrx/store';
import { InscripcioneActions } from './store/inscripcione.actions';
import { AlumnosService } from '../../core/alumnos/alumnos.service';
import { CursosService } from '../../core/cursos/cursos.service';
import { Observable, Subscription } from 'rxjs';
import { IInscripcion, IInscripcionForm } from './models';
import { IAlumno } from '../alumnos/models';
import { ICurso } from '../cursos/models';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { selectInscripciones, selectIsLoading } from './store/inscripcione.selectors';
import Swal from 'sweetalert2';
import { selectCursos } from '../cursos/store/curso.selectors';
import { selectAlumnos } from '../alumnos/store/alumno.selectors';
import { AlumnoActions } from '../alumnos/store/alumno.actions';
import { CursoActions } from '../cursos/store/curso.actions';
import { IUser } from '../users/models';
import { authUser } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent implements OnInit, OnDestroy{
  displayedColumns = ['id', 'alumno', 'curso', 'fechaInscripcion', 'usuario', 'actions'];

  loadingInscripciones$: Observable<boolean>;
  inscripciones$: Observable<IInscripcion[]>;
  cursos$: Observable<ICurso[]>;
  alumnos$: Observable<IAlumno[]>;
  authUserSubscription?: Subscription;
  authUser: IUser | null = null;

  inscripcionesForm = new FormGroup<IInscripcionForm>({
    alumno: new FormControl(null, Validators.required),
    curso: new FormControl(null, Validators.required),
  });

  constructor(private inscripcionesService:InscripcionesService, 
    private alumnosService: AlumnosService, 
    private cursosService: CursosService,
     private store: Store) {

      this.loadingInscripciones$ = this.store.select(selectIsLoading);
      this.inscripciones$ = this.store.select(selectInscripciones);
      this.cursos$ = this.store.select(selectCursos);
      this.alumnos$ = this.store.select(selectAlumnos);
      this.authUserSubscription = this.store.select(authUser).subscribe({
        next: (user) => {
          if (user) 
            this.authUser = user;
        },
      });
   }
  ngOnDestroy(): void {
    this.authUserSubscription?.unsubscribe();
  }
  
  ngOnInit(): void {
    this.store.dispatch( AlumnoActions.loadAlumnos());
    this.store.dispatch( CursoActions.loadCursos());
    this.store.dispatch(
      InscripcioneActions.loadInscripciones()
    ); 
  }

  createInscripcion() {
    if (this.inscripcionesForm.invalid) {
      this.inscripcionesForm.markAllAsTouched();
    }else{
    this.store.dispatch(
      InscripcioneActions.createInscripcion({
        payload: {
          studentId: this.inscripcionesForm.get('alumno')?.value?.id,
          courseId: this.inscripcionesForm.get('curso')?.value?.id,
          userId: this.authUser?.id,
          fechaInscripcion: new Date()
        },
      })
    );
  }
  }

  deleteInscripcionById(id: string): void {
    Swal.fire({
      title: "Esta seguro de eliminar la inscripción?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(InscripcioneActions.deleteInscripcionById({ id }));
      }
    });
  }

  
}
