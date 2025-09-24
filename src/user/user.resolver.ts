import {
  Args,
  Directive,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, Comment } from './dto/user.model';
import {
  GetUserByNameAndEmailArgs,
  GetUserByNameAndEmailInput,
  CreateUserInput,
} from './dto/user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  getUser(@Args('id') id: string) {
    return this.userService.getUser({ id });
  }

  @ResolveField(() => [Comment])
  comments(@Parent() user: User) {
    return this.userService.getComments({ userId: user.id });
  }

  @Query(() => User)
  getUserByNameAndEmailInput(@Args('input') input: GetUserByNameAndEmailInput) {
    return this.userService.getUserByNameAndEmail(input);
  }

  @Directive('@deprecated(reason: "This query is deprecated")')
  @Query(() => User)
  getUserByNameAndEmailArgs(
    @Args() { name, email }: GetUserByNameAndEmailArgs,
  ) {
    return this.userService.getUserByNameAndEmail({
      name,
      email,
    });
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }
}
