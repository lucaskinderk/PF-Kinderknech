import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { environment } from '../../../../../environments/environment';
import { CreateUserPayload, IUser } from '../../components/users/models';

describe('UsersService', () => {
  let usersService: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [HttpClientTestingModule],
    });

    usersService = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('getUsers debe realizar una paticion GET a {apiUrl}/users', () => {
    usersService.getUsers().subscribe({
      next: (resp) => {
        expect(Array.isArray(resp)).toBeTrue();
      },
    });
    httpTestingController
      .expectOne({
        method: 'GET',
        url: environment.baseAPIURL + '/users',
      })
      .flush([]);
  });

  it('createUser debe ejecutar POST a {apiUrl}/users', () => {
    const payload: CreateUserPayload = {
      createdAt: new Date(),
      email: 'some@mail.com',
      firstName: 'TEST',
      lastName: 'TEST',
      role: 'ADMIN',
    };

    const mockResp: IUser = {
      createdAt: new Date(),
      email: 'some@mail.com',
      firstName: 'TEST',
      lastName: 'TEST',
      role: 'ADMIN',
      id: 12312,
    };

    usersService.createUser(payload).subscribe((resp) => {
      expect(resp).toEqual(mockResp);
    });

    httpTestingController
      .expectOne({
        method: 'POST',
        url: environment.baseAPIURL + '/users',
      })
      .flush(mockResp);
  });
});
