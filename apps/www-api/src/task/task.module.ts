import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { ApiTaskController } from './task.controller';
import { TaskResolver } from './task.resolver';
import { DataLoaderInterceptor } from 'nestjs-dataloader'
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserDataLoader } from '../user/user.loader';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([TaskRepository]),
    UserModule,
  ],
  controllers: [
    ApiTaskController,
  ],
  providers: [
    TaskService,
    TaskResolver,
    UserDataLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
  exports: [TaskService],
})
export class TaskModule { }
