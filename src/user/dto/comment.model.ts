import { Field, ID, ObjectType } from '@nestjs/graphql';

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
