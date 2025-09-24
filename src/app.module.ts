import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { GraphQLDate, GraphQLJSON, GraphQLUUID } from 'graphql-scalars';
import { CustomString } from './user/type/date.type';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      resolvers: {
        JSON: GraphQLJSON,
        Date: GraphQLDate,
        UUID: GraphQLUUID,
        CustomString: CustomString,
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
