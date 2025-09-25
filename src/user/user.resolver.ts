import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Person, User, Admin } from './dto/person.types';
import { loggerMiddleware } from './middlwares/console-log.middleware';
// import { Person, User, Admin } from './dto/abstract-person.types';

@Resolver(() => Person)
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

  @ResolveField(() => [String], {
    middleware: [loggerMiddleware],
    nullable: true,
  })
  async rules() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ['rule1', 'rule2', 'rule3'];
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
    const admins = this.userService.getAllAdmins();
    console.log('inside query');
    return admins;
  }
}
