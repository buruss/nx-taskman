import { Module, NestModule, MiddlewareConsumer, RequestMethod, } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TaskModule } from './services/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './environments/typeorm.config';
import { AuthModule } from './services/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { NextModule, NextMiddleware } from '@nestpress/next';
import * as winston from 'winston'; // 로깅용
import * as path from 'path';
import { ControllersModule } from './controllers/controllers.module';
// require 구문은 typescript 컴파일 오류 발생시킴.
const DailyRotateFile = require('winston-daily-rotate-file');

@Module({
  imports: [
    NextModule,
    TypeOrmModule.forRoot(typeOrmConfig), // TypeORM 설정
    GraphQLModule.forRoot({ // GraphQL 설정
      autoSchemaFile: path.resolve(__dirname, '../schema.gql'),
      debug: process.env.NODE_ENV !== 'production',
      playground: true,
      context: ({ req }) => ({ req }) // graphql-auth.guard 가 동작하려면 필요한 옵션
    }),
    TaskModule,
    AuthModule,
    WinstonModule.forRoot({ // winston 로깅 설정
      level: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'silly' : 'debug',
      transports: [
        new (winston.transports.Console)(),
        new (DailyRotateFile)({
          datePattern: 'YYYY-MM-DD',
          dirname: path.resolve(__dirname, `../log/`),
          filename: `app_%DATE%.log`,
          maxFiles: '7d',
          // timestamp: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS'),
        })
      ]
    }),
    ControllersModule,
  ],
})
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
        path: 'static/*',
        method: RequestMethod.GET,
      });
  }
}

