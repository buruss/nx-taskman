import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput } from './create-todo.input';
import { GetTodosInput } from './get-todos.input';
import { TodoRepository } from './todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoItem, PaginatedTodoItems } from './todo-item.entity';
import { User } from '../user/user.entity';
import { TodoConversation } from './todo-conversation.entity';
import { AddTodoConversationInput } from './add-todo-conversation.input';
import { TodoLabel } from './todo-label.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {

  }

  getTodos(
    filterInput: GetTodosInput,
    user: User,
  ): Promise<PaginatedTodoItems> {
    return this.todoRepository.getTodos(filterInput, user);
  }

  getTodoLabels(): Promise<TodoLabel[]> {
    return this.todoRepository.getTodoLabels();
  }

  // getAllTodos(): Todo[] {
  //     return this.todos;
  // }

  // getTodosWithFilter(filterDto: GetTodosFilterDto): Todo[] {
  //     const {status, search} = filterDto;
  //     return this.todos.filter(todo => {
  //         return (
  //             (
  //                 !status 
  //                 || todo.status === status
  //             ) 
  //             && (
  //                 !search 
  //                 || todo.title.includes(search) 
  //                 || todo.description.includes(search)
  //             )
  //         );
  //     })
  // }

  async getTodoById(id: string, user: User): Promise<TodoItem> {
    const found = await this.todoRepository.findOne({ where: { id, userId: user.id } });

    if (!found) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return found;
  }

  createTodo(
    createTodoInput: CreateTodoInput,
    user: User,
  ): Promise<TodoItem> {
    return this.todoRepository.createTodo(createTodoInput, user);
  }

  addTodoConversation(
    addTodoDetailInput: AddTodoConversationInput,
  ): Promise<TodoConversation> {
    return this.todoRepository.addTodoConversation(addTodoDetailInput);
  }

  async deleteTodo(id: string, user: User): Promise<boolean> {
    const result = await this.todoRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return true;
  }


  getTodoConversations(
    id: string,
  ): Promise<TodoConversation[]> {
    return this.todoRepository.getTodoConversations(id);
  }


}
