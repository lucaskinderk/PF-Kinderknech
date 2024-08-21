import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './list-usuarios/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';

@NgModule({
  declarations: [UsersComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: [UsersComponent],
})
export class UsersModule {}
