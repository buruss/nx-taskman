
import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { TodoItem } from './todo-item.entity';
import { getRepository, In } from 'typeorm';
import { TodoLabel } from './todo-label.entity';

@InputType()
export class CreateTodoInputDto {
  @IsNotEmpty()
  @MaxLength(100)
  @Field()
  title: string;

  @MaxLength(500)
  @IsOptional()
  @Field({nullable: true})
  notes?: string;

  @Field({nullable: true})
  startDate?: Date;

  @Field({nullable: true})
  dueDate?: Date;

  @Field({nullable: true})
  completed?: boolean;

  @Field({nullable: true})
  starred?: boolean;

  @Field({nullable: true})
  important?: boolean;

  @Field({nullable: true})
  selected?: boolean;

  @Field({nullable: true})
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