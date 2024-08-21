import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { authUser } from '../../store/auth/auth.selectors';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(authUser).pipe(
    map((authUser) => {
      if (authUser?.role !== 'ADMIN') {
        return router.createUrlTree(['nav', 'home']);
      }
      return true;
    })
  );
};
