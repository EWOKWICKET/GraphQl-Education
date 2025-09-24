import { GraphQLScalarType, StringValueNode } from 'graphql';

export const CustomString = new GraphQLScalarType({
  name: 'CustomString',
  description: 'CustomString custom scalar type',
  parseValue: (value: string) => value,
  serialize: (value: string) => value,
  parseLiteral: (ast: StringValueNode) => ast.value,
});
