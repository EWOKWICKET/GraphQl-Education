import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetUserByNameAndEmailInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}

@ArgsType()
export class GetUserByNameAndEmailArgs {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}
