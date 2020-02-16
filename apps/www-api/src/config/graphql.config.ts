import { GqlModuleOptions } from '@nestjs/graphql'
import * as path from 'path';
import { getConfig } from '.';

const config = getConfig().nextServer;
console.log(`graphql cors origin = ${config.host}:${config.port}`);

export const graphqlOptions: GqlModuleOptions = { // GraphQL 설정
  autoSchemaFile: path.resolve(__dirname, '../../schema.gql'),
  debug: process.env.NODE_ENV !== 'production',
  playground: {
    settings: {
      // 아래 옵션은 playground에서 쿠키를 전송하도록 허용한다.
      // 이래도 안되면 graphql playground 화면 우상단 톱니바퀴 버튼 클릭하여 아래 설정을 직접 설정해야 함
      "request.credentials": "include"
    }
  },
  introspection: true,
  // 다른 도메인에서 쿠키 헤더를 전송 받으려면 cors 설정 필요
  cors: {
    origin: `${config.host}:${config.port}`,
    credentials: true,
  },
  context: ({ req, res }) => ({ req, res }) // graphql-auth.guard 가 동작하려면 필요한 옵션
};