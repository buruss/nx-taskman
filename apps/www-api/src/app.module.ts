import { Module, } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TaskModule } from './task/task.module';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
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
      TaskModule,
      TodoModule,
      AuthModule,
      UserModule,
    ],
  }
)
export class AppModule {}

