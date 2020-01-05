import { GqlModuleOptions } from '@nestjs/graphql'
import * as path from 'path';

export const graphqlOptions: GqlModuleOptions = { // GraphQL 설정
  autoSchemaFile: path.resolve(__dirname, '../../schema.gql'),
  debug: process.env.NODE_ENV !== 'production',
  playground: {
    settings: {
      // 아래 옵션은 playground에서 쿠키를 전송하도록 허용한다.
      // 이래도 안되면 graphql playground 화면 우상단 톱니바퀴 버튼 클릭하여 아래 설정을 직접 설정해야 함
      "request.credentials": "same-origin"
    }
  },
  introspection: true,
  context: ({ req, res }) => ({ req, res }) // graphql-auth.guard 가 동작하려면 필요한 옵션
};