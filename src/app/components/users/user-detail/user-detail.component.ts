import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userForm: FormGroup;
  hide=true;
  isEditMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {editingUser?: IUser, editMode: boolean}
  ) {
    this.isEditMode = data.editMode;

    this.userForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$')],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
        ],
      ],
      role: ['USER', [Validators.required]],
    });

    if (data.editingUser) {
      this.userForm.patchValue(data.editingUser);
    }

    if (!this.isEditMode) {
      this.userForm.disable();
    }
  }

  get firstNameControl() {
    return this.userForm.get('firstName');
  }

  get lastNameControl() {
    return this.userForm.get('lastName');
  }

  get addressControl() {
    return this.userForm.get('address');
  }

  get phoneControl() {
    return this.userForm.get('phone');
  }

  get passwordControl() {
    return this.userForm.get('password');
  }

  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);
    }
  }
}
