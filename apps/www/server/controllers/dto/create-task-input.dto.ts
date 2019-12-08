
import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Task } from '../../services/task/task.entity';

@InputType()
export class CreateTaskInputDto {
  @IsNotEmpty()
  @Field()
  tit: string;

  @IsNotEmpty()
  @Field()
  desc: string;

  toEntity(): Task {
    const task = new Task();
    task.title = this.tit;
    task.description = this.desc;
    return task;
  }
}