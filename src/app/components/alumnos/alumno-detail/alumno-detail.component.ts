import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAlumno } from '../models';
import { Store } from '@ngrx/store';
import { IInscripcion } from '../../inscripciones/models';
import { Observable } from 'rxjs';
import { selectInscripciones } from '../../inscripciones/store/inscripcione.selectors';
import { InscripcioneActions } from '../../inscripciones/store/inscripcione.actions';

@Component({
  selector: 'app-alumno-detail',
  templateUrl: './alumno-detail.component.html',
  styleUrl: './alumno-detail.component.scss'
})
export class AlumnoDetailComponent implements OnInit{
  displayedColumns = ['id', 'curso', 'tutor', 'fechaInscripcion'];
  alumnoForm: FormGroup;  
  isEditMode: boolean;
  inscripcionesByStudent$: Observable<IInscripcion[]> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private matDialogRef: MatDialogRef<AlumnoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {editAlumno?: IAlumno, editMode: boolean}
  ) {
    
    this.isEditMode = data.editMode;
    this.alumnoForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
          Validators.maxLength(10),
          Validators.minLength(4),
        ],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$')],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
      gender: ['', [Validators.required]],
      perfil: ['', [Validators.required]]
    });

 
    if (data.editAlumno) {
      this.alumnoForm.patchValue(data.editAlumno);
      this.inscripcionesByStudent$ = this.store.select(selectInscripciones);
      const id = data.editAlumno.id; 
      this.store.dispatch( InscripcioneActions.loadInscripcionesByStudentId({id}));
    }

    if (!this.isEditMode) {
      this.alumnoForm.disable();
    }

    

  }

  ngOnInit(): void {
    
  }

  get firstNameControl() {
    return this.alumnoForm.get('firstName');
  }

  get lastNameControl() {
    return this.alumnoForm.get('lastName');
  }

  get emailControl() {
    return this.alumnoForm.get('email');
  }

  get genderControl() {
    return this.alumnoForm.get('gender');
  }

  get perfilControl() {
    return this.alumnoForm.get('perfil');
  }

  save(): void {
    if (this.alumnoForm.invalid) {
      this.alumnoForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.alumnoForm.value);
    }
  }
}
