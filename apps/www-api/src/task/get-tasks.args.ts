import { TaskStatus } from "@nx-taskman/constants";
import { IsOptional, IsIn, IsNotEmpty, IsString } from "class-validator";
import { ArgsType, Field, } from '@nestjs/graphql';


@ArgsType()
export class GetTasksArgs {
  @Field(type => TaskStatus, {nullable: true})
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  st?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search?: string;
}