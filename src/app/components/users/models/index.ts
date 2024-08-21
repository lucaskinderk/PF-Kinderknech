export type UserRole = 'ADMIN' | 'USER';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  address: string;
  phone: string;
  createdAt: Date;
}

export interface CreateUserPayload {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  role: string | null;
  address: string | null;
  phone: string | null;
  createdAt: Date | null;
}
