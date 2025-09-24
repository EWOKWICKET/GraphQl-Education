import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

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

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: number;

  @Field(() => String, {
    nullable: true,
    description: 'The header of the comment',
    name: 'header',
  })
  commentHeader?: string;

  @Field(() => String)
  content: string;
}
