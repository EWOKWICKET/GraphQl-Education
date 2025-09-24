import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Person, User, Admin } from './dto/person.types';
// import { Person, User, Admin } from './dto/abstract-person.types';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [Person])
  getAllPeople(): Person[] {
    return this.userService.getAllPeople();
  }

  @Query(() => User, { nullable: true })
  getUser(@Args('id') id: number): User | undefined {
    return this.userService.getUser(id);
  }

  @Query(() => Admin, { nullable: true })
  getAdmin(@Args('id') id: number): Admin | undefined {
    return this.userService.getAdmin(id);
  }

  @Query(() => [User])
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Query(() => [Admin])
  getAllAdmins(): Admin[] {
    return this.userService.getAllAdmins();
  }
}
