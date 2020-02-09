import { Field, ObjectType, } from 'type-graphql'
import { TodoLabel } from './todo-label.entity';
import { TodoItem } from './todo-item.entity';
import { getPaginatedResponse } from '@nx-taskman/logics';

// we need to create a temporary class for the abstract, generic class "instance"
@ObjectType()
export class PaginatedTodoItems extends getPaginatedResponse(TodoItem) {}

@ObjectType()
export class TodoInitialData {
    @Field(type => PaginatedTodoItems)
    paginatedTodoItems: PaginatedTodoItems;
    
    @Field(type => [TodoLabel])
    todoLabels: TodoLabel[];
}
