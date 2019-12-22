import { NestModule, MiddlewareConsumer, RequestMethod, Module, } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { NextModule, NextMiddleware } from '@nestpress/next';
import { AppController } from './app.controller';
import { graphqlOptions } from './config/graphql.config';
import { typeOrmConfig } from './config/typeorm.config';
import { winstonOptions } from './config/winston.config';
import { UserModule } from './user/user.module';

@Module(
  {
    imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      GraphQLModule.forRoot(graphqlOptions),
      WinstonModule.forRoot(winstonOptions),
      NextModule,
      TaskModule,
      AuthModule,
      UserModule,
    ],
    controllers: [
      AppController,
    ]
  }
)
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NextMiddleware)
      .forRoutes({
        path: '_next*',
        method: RequestMethod.GET,
      });

    consumer
      .apply(NextMiddleware)
      .forRoutes({
        path: '/*', // www 프로젝트의 public 폴더로 연결됨. (next 기본 설정. 변경 불가)
        method: RequestMethod.GET,
      });
  }
}

