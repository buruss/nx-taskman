import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'; // 로깅용
import * as path from 'path';
// require 구문은 typescript 컴파일 오류 발생시킴.
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule,
    WinstonModule.forRoot({
      level: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'silly' : 'debug',
      transports: [
        new (winston.transports.Console)(),
        new (DailyRotateFile)({
          datePattern: 'YYYY-MM-DD',
          dirname: path.join(__dirname, `../../log/`),
          filename: `app_%DATE%.log`,
          maxFiles: '7d',
          // timestamp: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS'),
        })
      ]
    }),
  ],
})
export class AppModule {}
