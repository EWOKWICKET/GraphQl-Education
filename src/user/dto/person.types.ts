import { Field, ID, InterfaceType, ObjectType } from '@nestjs/graphql';

@InterfaceType({
  resolveType: (person) => {
    if ('firstName' in person) {
      return User;
    }
    if ('team' in person) {
      return Admin;
    }
    return null;
  },
})
export abstract class Person {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  role: string;
}

@ObjectType({ implements: () => [Person] })
export class User implements Person {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  role: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}

@ObjectType({ implements: () => [Person] })
export class Admin implements Person {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  team: string;

  @Field(() => [String], { nullable: true })
  rules?: string[];
}

// just to show
const adminFragment = `fragment adminParts on Admin {
  role
  team
}`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const adminsQuery = `query admins {
  admins {
    ...adminParts
  }
  ${adminFragment}
}`;
