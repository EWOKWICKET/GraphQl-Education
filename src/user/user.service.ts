import { Injectable } from '@nestjs/common';
// import { Person, User, Admin } from './dto/person.types';
import { Person, User, Admin } from './dto/abstract-person.types';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john_doe',
      password: 'password',
      role: 'user',
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      id: 2,
      username: 'jane_smith',
      password: 'password',
      role: 'user',
      firstName: 'Jane',
      lastName: 'Smith',
    },
    {
      id: 3,
      username: 'jim_beam',
      password: 'password',
      role: 'user',
      firstName: 'Jim',
      lastName: 'Beam',
    },
  ];
  private readonly admins: Admin[] = [
    {
      id: 1,
      username: 'admin_alice',
      password: 'password',
      role: 'admin',
      team: 'potuhzni',
    },
    {
      id: 2,
      username: 'manager_bob',
      password: 'password',
      role: 'admin',
      team: 'sorry tut tilky potuzhni',
    },
  ];

  constructor() {}

  // Get all persons (both users and admins)
  getAllPeople(): Person[] {
    return [...this.users, ...this.admins];
  }

  // Get user by ID
  getUser(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  // Get admin by ID
  getAdmin(id: number): Admin | undefined {
    return this.admins.find((admin) => admin.id === id);
  }

  // Get all users
  getAllUsers(): User[] {
    return this.users;
  }

  // Get all admins
  getAllAdmins(): Admin[] {
    return this.admins;
  }
}
