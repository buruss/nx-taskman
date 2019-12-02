import { Module } from '@nestjs/common';
import { NextModule } from '@nestpress/next';
import { HomeController } from './home.controller';
import { ApiAuthController } from './api/auth.controller';
import { ApiTasksController } from './api/tasks.controller';
import { AuthModule } from '../auth/auth.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [
    NextModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [
    HomeController,
    ApiAuthController,
    ApiTasksController,
  ]
})
export class RoutesModule { }
