import { TaskStatus } from "@nx-taskman/constants";
import { IsOptional, IsIn, IsNotEmpty, IsString } from "class-validator";
import { Field, ArgsType, } from 'type-graphql';


@ArgsType()
export class GetTasksArgsDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  @Field(type => TaskStatus, { nullable: true }) // enum 인 경우 type 명시 필수
  st?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  search?: string;
}