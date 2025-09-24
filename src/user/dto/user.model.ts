import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLDate, GraphQLJSON, GraphQLUUID } from 'graphql-scalars';
import { CustomString } from '../type/date.type';

// Scalars: String, Int, Float, Boolean, ID, Date, JSON, UUID

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => String)
  email: string;

  @Field(() => [Comment], { nullable: 'items' })
  comments: Comment[];

  @Field(() => GraphQLJSON, { nullable: true, defaultValue: {} })
  metadata?: Record<string, string | number>;

  @Field(() => GraphQLDate, { deprecationReason: 'This field is deprecated' })
  createdAt: Date;

  @Field(() => GraphQLUUID, { nullable: true })
  uuid?: string;

  @Field(() => CustomString, {
    description: 'My custom string',
    nullable: true,
    defaultValue: 'my custom string',
  })
  customString?: string;
}

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => String, {
    nullable: true,
    description: 'The header of the comment',
    name: 'header',
  })
  commentHeader?: string;

  @Field(() => String)
  content: string;
}
