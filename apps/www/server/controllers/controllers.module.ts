import { Module } from '@nestjs/common';
import { NextModule } from '@nestpress/next';
import { HomeController } from './home.controller';
import { ApiAuthController } from './restapi/auth.controller';
import { ApiTaskController } from './restapi/task.controller';
import { AuthModule } from '../services/auth/auth.module';
import { TaskModule } from '../services/task/task.module';
import { AuthResolver } from './graphapi/auth.resolver'
import { TaskResolver } from './graphapi/task.resolver';

@Module({
  imports: [
    NextModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [
    HomeController,
    ApiAuthController,
    ApiTaskController,
  ],
  providers: [
    AuthResolver,
    TaskResolver,
  ]
})
export class ControllersModule { }
