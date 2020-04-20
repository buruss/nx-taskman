
import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { TaskDetail } from './task-detail.entity';

@InputType()
export class AddTaskDetailInput {

  @IsNotEmpty()
  tid: number;

  @IsNotEmpty()
  dtype: string;

  @IsNotEmpty()
  det: string;

  toEntity(): TaskDetail {
    const taskDetail = new TaskDetail();
    taskDetail.taskId = this.tid;
    taskDetail.detailType = this.dtype;
    taskDetail.detail = this.det;
    return taskDetail;
  }
}