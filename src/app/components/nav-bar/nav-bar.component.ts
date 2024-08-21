import { Component } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Observable, filter, map } from 'rxjs';
import { IUser } from '../users/models';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth/auth.actions';
import { authUser } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  authUser$: Observable<IUser | null>;
  authUserSinPipe: IUser | null = null;

  routeData$: Observable<Data | undefined>;

  constructor(private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private store: Store
  ){   
    this.authUser$ = this.store.select(authUser);
    this.routeData$ = router.events.pipe(
      filter((ev) => ev instanceof NavigationEnd),
      map(() => route.firstChild?.snapshot.data)
    );
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.store.dispatch(
      authActions.logout()
    )
  }

}
