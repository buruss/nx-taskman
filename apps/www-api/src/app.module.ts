import { NestModule, MiddlewareConsumer, RequestMethod, Module, } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { NextModule, NextMiddleware } from '@nestpress/next';
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
  }
)
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      
    consumer
      .apply(NextMiddleware)
      // rest api 경로와 graphql api 경로를 제외한 모든 경로를 next.js로 넘김
      .exclude(
        {path: '/api/*', method: RequestMethod.ALL},
        {path: '/graphql', method: RequestMethod.ALL},
      )
      .forRoutes(
        {path: '/*', method: RequestMethod.GET}, 
      );

  }
}

