import { TaskStatus } from "@nx-taskman/constants";
import { IsNotEmpty } from "class-validator";
import { ArgsType, Field, } from '@nestjs/graphql';

@ArgsType()
export class UpdateTaskStatusArgs {
  @IsNotEmpty()
  tid: number;

  @Field(type => TaskStatus)
  @IsNotEmpty()
  st: TaskStatus;
}