import { TaskStatus } from "@nx-taskman/constants";
import { IsNotEmpty } from "class-validator";
import { Field, ArgsType, } from 'type-graphql';

@ArgsType()
export class UpdateTaskStatusArgsDto {
  @IsNotEmpty()
  @Field()
  tid: number;

  @IsNotEmpty()
  @Field(type => TaskStatus) // enum 인 경우 type 명시 필수
  st: TaskStatus;
}