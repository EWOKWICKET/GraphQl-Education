import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => String)
  email: string;

  @Field(() => [Comment], { nullable: 'items' })
  comments: Comment[];
}
