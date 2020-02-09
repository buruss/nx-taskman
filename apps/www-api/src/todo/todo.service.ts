import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInputDto } from './create-todo-input.dto';
import { GetTodosInputDto } from './get-todos-input.dto';
import { TodoRepository } from './todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoItem } from './todo-item.entity';
import { User } from '../user/user.entity';
import { TodoConversation } from './todo-conversation.entity';
import { AddTodoConversationInputDto } from './add-todo-conversation-input.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { TodoLabel } from './todo-label.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {

  }

  getTodos(
    filterDto: GetTodosInputDto,
    user: User,
  ): Promise<Pagination<TodoItem>> {
    return this.todoRepository.getTodos(filterDto, user);
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
    createTodoDto: CreateTodoInputDto,
    user: User,
  ): Promise<TodoItem> {
    return this.todoRepository.createTodo(createTodoDto, user);
  }

  addTodoConversation(
    addTodoDetailInputDto: AddTodoConversationInputDto,
  ): Promise<TodoConversation> {
    return this.todoRepository.addTodoConversation(addTodoDetailInputDto);
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
