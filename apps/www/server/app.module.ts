import { Module, NestModule, MiddlewareConsumer, RequestMethod, } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './environments/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { NextModule, NextMiddleware } from '@nestpress/next';
import * as winston from 'winston'; // 로깅용
import * as path from 'path';
import { RoutesModule } from './routes/routes.module';
// require 구문은 typescript 컴파일 오류 발생시킴.
const DailyRotateFile = require('winston-daily-rotate-file');

@Module({
  imports: [
    NextModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule,
    WinstonModule.forRoot({
      level: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'silly' : 'debug',
      transports: [
        new (winston.transports.Console)(),
        new (DailyRotateFile)({
          datePattern: 'YYYY-MM-DD',
          dirname: path.join(__dirname, `../log/`),
          filename: `app_%DATE%.log`,
          maxFiles: '7d',
          // timestamp: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS'),
        })
      ]
    }),
    RoutesModule,
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

