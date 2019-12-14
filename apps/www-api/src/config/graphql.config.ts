import { GqlModuleOptions } from '@nestjs/graphql'
import * as path from 'path';
// import { ConfigService } from './config.service1';

export const graphqlOptions: GqlModuleOptions = { // GraphQL 설정
  autoSchemaFile: path.resolve(__dirname, '../../schema.gql'),
  debug: process.env.NODE_ENV !== 'production',
  playground: true,
  context: ({ req }) => ({ req }) // graphql-auth.guard 가 동작하려면 필요한 옵션
};