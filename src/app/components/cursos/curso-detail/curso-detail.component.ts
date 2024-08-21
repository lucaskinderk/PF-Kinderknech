import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICurso } from '../models';
import { Store } from '@ngrx/store';
import { IInscripcion } from '../../inscripciones/models';
import { Observable } from 'rxjs';
import { selectInscripciones } from '../../inscripciones/store/inscripcione.selectors';
import { InscripcioneActions } from '../../inscripciones/store/inscripcione.actions';

@Component({
  selector: 'app-curso-detail',
  templateUrl: './curso-detail.component.html',
  styleUrl: './curso-detail.component.scss'
})
export class CursoDetailComponent {
  displayedColumns = ['id', 'alumno', 'fechaInscripcion'];
  cursoForm: FormGroup;  
  isEditMode: boolean;
  inscripcionesByCourse$: Observable<IInscripcion[]> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private matDialogRef: MatDialogRef<CursoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {editCurso?: ICurso, editMode: boolean}
  ) {
    this.isEditMode = data.editMode;
    this.cursoForm = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
          Validators.maxLength(50),
          Validators.minLength(2),
        ],
      ],
      cantHs: [
        '',
        [Validators.required],
      ],
      cantClases: [
        '',
        [
          Validators.required,
        ],
      ],
      tutor: ['', [Validators.required]],
    });

    if (data.editCurso) {
      this.cursoForm.patchValue(data.editCurso);
      this.inscripcionesByCourse$ = this.store.select(selectInscripciones);
      const id = data.editCurso.id; 
      this.store.dispatch( InscripcioneActions.loadInscripcionesByCourseId({id}));
    }

    if (!this.isEditMode) {
      this.cursoForm.disable();
    }
  }

  get nombreControl() {
    return this.cursoForm.get('nombre');
  }

  get cantHsControl() {
    return this.cursoForm.get('cantHs');
  }

  get cantClasesControl() {
    return this.cursoForm.get('cantClases');
  }

  get tutorControl() {
    return this.cursoForm.get('tutor');
  }

  save(): void {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.cursoForm.value);
    }
  }
}
