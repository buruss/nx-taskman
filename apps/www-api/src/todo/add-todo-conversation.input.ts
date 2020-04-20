
import { IsNotEmpty, MaxLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddTodoConversationInput {

  @IsNotEmpty()
  todoId: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @MaxLength(100)
  message: string;

  @Field()
  @IsNotEmpty()
  sentAt: Date;

}