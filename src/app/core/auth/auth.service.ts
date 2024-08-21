import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginData } from '../../components/auth/models';
import { IUser } from '../../components/users/models';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UsersService } from '../usuarios/users.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _authUser$ = new BehaviorSubject<IUser | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router, private userService: UsersService) {}

  login(data: LoginData): void {
    if(data.email && data.password){
      this.userService.getUserByEmailAndPassword(data.email, data.password).subscribe( {
        next:(user) =>
          {
            if(user && user?.length>0){
              this._authUser$.next(user[0])
            }
        },
        complete: () => 
           {
              localStorage.setItem(
              'accessToken',
              'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfds'),
              this.router.navigate(['nav', 'home'])
        }
        })
    }
    
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('accessToken');
  }
}
