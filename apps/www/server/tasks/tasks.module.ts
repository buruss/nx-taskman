import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule,
  ],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule { }
