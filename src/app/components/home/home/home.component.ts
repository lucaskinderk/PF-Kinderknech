import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../users/models';
import { Store } from '@ngrx/store';
import { authUser } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  authUser$: Observable<IUser | null>;

  constructor(private store: Store) {
    this.authUser$ = this.store.select(authUser);
  }
}
