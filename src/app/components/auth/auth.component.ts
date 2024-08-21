import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authUser, selectAuthError } from '../../store/auth/auth.selectors';
import { authActions } from '../../store/auth/auth.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnDestroy, OnInit {
  loginForm: FormGroup;

  authUserSubscription?: Subscription;
  authErrorSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });    
  }

  ngOnInit(): void {
    this.authUserSubscription = this.store.select(authUser).subscribe({
      next: (user) => {
        if (user) this.router.navigate(['nav', 'home']);
      },
    });

    this.authErrorSubscription = this.store.select(selectAuthError).subscribe({
      next: (error) => {
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error as string,
          });
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.authUserSubscription?.unsubscribe();
    this.authErrorSubscription?.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.store.dispatch(
        authActions.login({ payload: this.loginForm.getRawValue() })
      );
    }
  }
}