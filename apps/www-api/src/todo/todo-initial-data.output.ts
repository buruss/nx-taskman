import { ObjectType, Field, } from '@nestjs/graphql'
import { TodoLabel } from './todo-label.entity';
import { PaginatedTodoItems } from './todo-item.entity';

@ObjectType()
export class TodoInitialData {
  @Field(type => PaginatedTodoItems)
  paginatedTodoItems: PaginatedTodoItems;

  @Field(type => [TodoLabel])
  todoLabels: TodoLabel[];
}
