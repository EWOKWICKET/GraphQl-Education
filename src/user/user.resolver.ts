import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './dto/user.model';
import { Comment } from './dto/comment.model';
import {
  GetUserByNameAndEmailArgs,
  GetUserByNameAndEmailInput,
} from './dto/user-name-email.input';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  getUser(@Args('id') id: number) {
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
