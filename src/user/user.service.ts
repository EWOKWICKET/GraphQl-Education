import { Injectable } from '@nestjs/common';
import { User, Comment } from './dto/user.model';
import { GetUserByNameAndEmailInput } from './dto/user.input';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      age: 30,
      comments: [],
      email: 'john.doe@example.com',
      metadata: {
        position: 'first',
        commentsCount: 2,
      },
      createdAt: new Date(),
      uuid: '123e4567-e89b-12d3-a456-426614174000',
    },
    {
      id: '2',
      name: 'Jane Doe',
      age: 25,
      comments: [],
      email: 'jane.doe@example.com',
      metadata: {},
      createdAt: new Date(),
      uuid: '123e4567-e89b-12d3-a456-426614174000',
    },
    {
      id: '3',
      name: 'Jim Doe',
      age: 20,
      comments: [],
      email: 'jim.doe@example.com',
      metadata: {},
      createdAt: new Date(),
      uuid: '123e4567-e89b-12d3-a456-426614174000',
    },
  ];

  private readonly comments: Comment[] = [
    {
      id: '1',
      userId: '1',
      commentHeader: 'This is a comment header',
      content: 'This is a comment',
    },
    { id: '2', userId: '1', content: 'This is a comment' },
    { id: '3', userId: '2', content: 'This is a comment' },
  ];

  constructor() {}

  getUser({ id }: { id: string }) {
    return this.users.find((user) => user.id === id);
  }

  getComments({ userId }: { userId: string }) {
    return this.comments.filter((comment) => comment.userId === userId);
  }

  getUserByNameAndEmail({ name, email }: GetUserByNameAndEmailInput) {
    return this.users.find(
      (user) => user.name === name && user.email === email,
    );
  }

  createUser({ name, email }: { name: string; email: string }) {
    const newUser = {
      id: (this.users.length + 1).toString(),
      name,
      email,
      comments: [],
      metadata: { customMeta: 'new User' },
      createdAt: new Date(),
      uuid: '123e4567-e89b-12d3-a456-426614174000',
    };
    this.users.push(newUser);
    return newUser;
  }
}
