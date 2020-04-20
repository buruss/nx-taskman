
import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Task } from './task.entity';

@InputType()
export class CreateTaskInput {
  @IsNotEmpty()
  tit: string;

  @IsNotEmpty()
  desc: string;

  toEntity(): Task {
    const task = new Task();
    task.title = this.tit;
    task.description = this.desc;
    return task;
  }
}