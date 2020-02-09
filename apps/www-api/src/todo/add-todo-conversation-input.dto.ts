
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddTodoConversationInputDto {

  @IsNotEmpty()
  @Field()
  todoId: string;

  @IsNotEmpty()
  @Field()
  userId: number;

  @IsNotEmpty()
  @MaxLength(100)
  @Field()
  message: string;

  @IsNotEmpty()
  @Field()
  sentAt: Date;

}