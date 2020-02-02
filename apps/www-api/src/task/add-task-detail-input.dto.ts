
import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { TaskDetail } from './task-detail.entity';

@InputType()
export class AddTaskDetailInputDto {

  @IsNotEmpty()
  @Field()
  tid: number;

  @IsNotEmpty()
  @Field()
  dtype: string;

  @IsNotEmpty()
  @Field()
  det: string;

  toEntity(): TaskDetail {
    const taskDetail = new TaskDetail();
    taskDetail.taskId = this.tid;
    taskDetail.detailType = this.dtype;
    taskDetail.detail = this.det;
    return taskDetail;
  }
}