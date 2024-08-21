import { Component, OnInit } from '@angular/core';
import { IUser } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import Swal from 'sweetalert2';
import { UsersService } from '../../../core/usuarios/users.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectLoadingUsers, selectUserList } from '../store/user.selectors';
import { UserActions } from '../store/user.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'address',
    'phone',
    'role',
    'createdAt',
    'actions',
  ];

  loading = false;
  loadingUsers$ : Observable<boolean>;
  users$: Observable<IUser[]>;

  users: IUser[] = [];

  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService,
    private store: Store
  ) {
    this.loadingUsers$ = this.store.select(selectLoadingUsers);
    this.users$ = this.store.select(selectUserList);
  }

  ngOnInit(): void {
    this.loading = true;
    this.store.dispatch(UserActions.loadUsers());
  }

  openDialog(editingUser?: IUser, editMode?: boolean): void {
    this.matDialog
      .open(UserDetailComponent, {
        data: {editingUser, editMode},
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingUser) {
              this.store.dispatch( UserActions.updateUser({id: editingUser.id , payload: result}))
            } else {
              result.createdAt = new Date();
              this.store.dispatch( UserActions.createUser({payload: result}));
            }
          }
        },
      });
  }

  onDeleteUser(id: string): void {
    Swal.fire({
      title: "Esta seguro de eliminar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch( UserActions.deleteUserById({id}));
      }
    })
  }
}
