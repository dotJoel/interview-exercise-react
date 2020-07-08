export * from './lib/api-interfaces';

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
}

export interface Tweet {
    id: string;
    user: User;
    message: string;
    timestamp: string;
  }
  