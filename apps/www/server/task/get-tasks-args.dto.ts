import { TaskStatus } from "../../lib/task-status.enum";
import { IsOptional, IsIn, IsNotEmpty, IsString } from "class-validator";
import { Field, ArgsType } from 'type-graphql';

@ArgsType()
export class GetTasksArgsDto {
  @IsOptional()
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  @Field({ nullable: true })
  st?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  search?: string;
}