export type UserRole = 'ADMIN' | 'ESTUDIANTE';

export interface User {
  email: string;
  password: string;
  role: UserRole;
  id: string;
  firstName: string;
  lastName: string;
  token: string;
}
