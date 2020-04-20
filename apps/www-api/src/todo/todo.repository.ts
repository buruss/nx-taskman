import { Repository, EntityRepository, getRepository, } from "typeorm";
import { TodoItem, PaginatedTodoItems } from "./todo-item.entity";
import { CreateTodoInput } from "./create-todo.input";
import { Logger, InternalServerErrorException } from "@nestjs/common";
import { GetTodosInput } from "./get-todos.input";
import { User } from "../user/user.entity";
import { AddTodoConversationInput } from './add-todo-conversation.input';
import { TodoConversation } from './todo-conversation.entity';
import { plainToClass } from 'class-transformer';
import { TodoLabel } from './todo-label.entity';

@EntityRepository(TodoItem)
export class TodoRepository extends Repository<TodoItem> {
  private logger = new Logger('TodoRepository');

  /**
   * 할일 목록을 페이지 단위로 읽어서 반환
   * @param filterInput 
   * @param user 
   */
  async getTodos(
    filterInput: GetTodosInput,
    user: User
  ): Promise<PaginatedTodoItems> {
    const { paging, label, search } = filterInput;
    const { itemCount, page} = paging;
    

    const qb = this.createQueryBuilder('todo');
    qb.where('todo.userId = :userId', { userId: user.id })
      .innerJoinAndSelect('todo.labels', 'labels');

    if (label) {
      qb.where('labels.id = :label', {label});
    }

    if (search) {
      // 괄호가 없으면 OR가 최상단 연산자로 인식되므로 꼭 괄호안에 OR 넣어야 함
      qb.andWhere(`(todo.title LIKE :search OR todo.notes LIKE :search)`, { search: `%${search}%` });
    }

    qb.orderBy('todo.id')
      // offset나 limit 메서드는 join된 쿼리 시에 정확한 아이템 개수를 반환하지 않음
      .skip((page - 1) * itemCount)
      .take(itemCount);

    try {
      const [todos, totalItems] = await qb.getManyAndCount();
      console.log(qb.getQuery());
      console.log(qb.getSql());
      const pageCount = Math.ceil(totalItems / itemCount);
      const paginatedTodos = {
        items: todos, 
        paging: { page, itemCount, totalItems, pageCount },
      };
      // const paginatedTodos = await paginate<TodoItem>(qb, filterDto.paging);

    // try {
    //   const opts: FindManyOptions = {
    //     // relations: ['labels'],
    //     where: {
    //       userId: user.id,
    //       id: Raw(alias =>`${alias} IN (select "todoItemId" FROM todo_item_labels_todo_label where "todoLabelId" = ${label})`),
    //       // labels: {
    //       //   id: 1,
    //       // }
    //     },
    //     order: {id: 'ASC'},
    //   };
    //   const paginatedTodos = await paginate<TodoItem>(this, filterDto.paging, opts);
      return paginatedTodos;
    } catch (error) {
      this.logger.error(`Failed to get todos for user "${user.username}", DTO: ${JSON.stringify(filterInput)}`, error.stack);
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
    createTodoInput: CreateTodoInput,
    user: User
  ): Promise<TodoItem> {
    const todo = await createTodoInput.toEntity();
    todo.user = user;

    try {
      await todo.save();
    } catch (error) {
      this.logger.error(`Failed to create a task for user "${user.username}". DTO: ${createTodoInput}`, error.stack);
      throw new InternalServerErrorException();
    }
    // 민감한 정보가 포함되어 있으므로 삭제 후 반환
    delete todo.user;
    return todo;
  }

  async addTodoConversation(
    addTodoConversationInput: AddTodoConversationInput,
    // todoConversation: TodoConversation
  ): Promise<TodoConversation> {
    // DTO를 Entity로 자동 형 변환
    const todoConversation = plainToClass(TodoConversation, addTodoConversationInput);
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