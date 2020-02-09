import { Repository, EntityRepository, getRepository } from "typeorm";
import { TodoItem } from "./todo-item.entity";
import { CreateTodoInputDto } from "./create-todo-input.dto";
import { Logger, InternalServerErrorException } from "@nestjs/common";
import { GetTodosInputDto } from "./get-todos-input.dto";
import { User } from "../user/user.entity";
import { AddTodoConversationInputDto } from './add-todo-conversation-input.dto';
import { TodoConversation } from './todo-conversation.entity';
import { plainToClass } from 'class-transformer';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TodoLabel } from './todo-label.entity';

@EntityRepository(TodoItem)
export class TodoRepository extends Repository<TodoItem> {
  private logger = new Logger('TodoRepository');

  async getTodos(
    filterDto: GetTodosInputDto,
    user: User
  ): Promise<Pagination<TodoItem>> {
    const { label, search } = filterDto;
    const query = this.createQueryBuilder('todo');

    query.where('todo.userId = :userId', { userId: user.id });

    if (label) {
      query.leftJoinAndSelect('todo.labels', 'labels')
        .andWhere(`labels.id = :label`, { label });
    }

    if (search) {
      // 괄호가 없으면 OR가 최상단 연산자로 인식되므로 꼭 괄호안에 OR 넣어야 함
      query.andWhere(`(todo.title LIKE :search OR todo.notes LIKE :search)`, { search: `%${search}%` });
    }

    try {
      const todos = await paginate<TodoItem>(query, filterDto.paging);
      return todos;
    } catch (error) {
      this.logger.error(`Failed to get todos for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  getTodoLabels(): Promise<TodoLabel[]> {
    try {
      return getRepository(TodoLabel).find();
    } catch (error) {
      this.logger.error(`Failed to get todo labels`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTodo(
    createTodoDto: CreateTodoInputDto,
    user: User
  ): Promise<TodoItem> {
    const todo = await createTodoDto.toEntity();
    todo.user = user;

    try {
      await todo.save();
    } catch (error) {
      this.logger.error(`Failed to create a task for user "${user.username}". DTO: ${createTodoDto}`, error.stack);
      throw new InternalServerErrorException();
    }
    // 민감한 정보가 포함되어 있으므로 삭제 후 반환
    delete todo.user;
    return todo;
  }

  async addTodoConversation(
    addTodoConversationInputDto: AddTodoConversationInputDto,
    // todoConversation: TodoConversation
  ): Promise<TodoConversation> {
    // DTO를 Entity로 자동 형 변환
    const todoConversation = plainToClass(TodoConversation, addTodoConversationInputDto);
    try {
      await todoConversation.save();
    } catch (error) {
      this.logger.error(`Failed to add a conversation for todo "${todoConversation.todoId}"`, error.stack);
      throw new InternalServerErrorException();
    }
    return todoConversation;
  }

  async getTodoConversations(
    todoId: string,
  ): Promise<TodoConversation[]> {
    const repo = getRepository(TodoConversation);

    try {
      const taskDetails = await repo.find({ where: { todoId } })
      return taskDetails;
    } catch (error) {
      this.logger.error(`Failed to get conversations for todo "${todoId}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}