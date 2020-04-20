
import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { TodoItem } from './todo-item.entity';
import { getRepository, In } from 'typeorm';
import { TodoLabel } from './todo-label.entity';

@InputType()
export class CreateTodoInput {
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @MaxLength(500)
  @IsOptional()
  notes?: string;

  @Field()
  startDate?: Date;

  @Field()
  dueDate?: Date;

  completed?: boolean;

  starred?: boolean;

  important?: boolean;

  selected?: boolean;

  deleted?: boolean;

  @Field(type => [Int], {nullable: true})
  labels?: number[];

  async toEntity(): Promise<TodoItem> {
    const todo = new TodoItem();
    todo.title = this.title;
    todo.notes = this.notes;
    todo.startDate = this.startDate;
    todo.dueDate = this.dueDate;
    todo.completed = this.completed;
    todo.starred = this.starred;
    todo.important = this.important;
    todo.selected = this.selected;
    todo.deleted = this.deleted;
    const repo = getRepository(TodoLabel);
    todo.labels = await repo.find({where: {id: In(this.labels)}});
    return todo;
  }
}