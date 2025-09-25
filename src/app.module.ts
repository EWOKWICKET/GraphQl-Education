import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { LoggerPlugin } from './user/plugins/logger.plugin';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      // buildSchemaOptions: {
      //   fieldMiddleware: [loggerMiddleware]
      // }
      plugins: [
        ApolloServerPluginCacheControl({
          defaultMaxAge: 300,
          calculateHttpHeaders: true,
        }),
      ],
    }),
    UserModule,
  ],
  providers: [LoggerPlugin],
})
export class AppModule {}
