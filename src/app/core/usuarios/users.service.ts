import { Injectable } from '@angular/core';
import { CreateUserPayload, IUser } from '../../components/users/models';
import {
  catchError,
  concatMap,
  delay,
  first,
  forkJoin,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(environment.baseAPIURL + '/users');
  }

  getUserById(id: string): Observable<IUser | undefined> {
    return this.httpClient.get<IUser>(`${environment.baseAPIURL}/users/${id}`);
  }

  createUser(payload: CreateUserPayload): Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${environment.baseAPIURL}/users`,
      payload
    );
  }

  getUserByEmailAndPassword(email: string, password: string): Observable<IUser[]> { //Se envian ambos parametros aunque JSON-SERVER solo limita la busqueda a email
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);

    return this.httpClient.get<IUser[]>(environment.baseAPIURL + '/users', { params });
  }

  deleteUser(id: string) {
    return this.httpClient.delete<IUser>(
      environment.baseAPIURL + '/users/' + id
    );
  }

  updateUser(id: string, data: IUser) {
    return this.httpClient.put<IUser>(
      environment.baseAPIURL + '/users/' + id,
      data
    );
  }
}
