import { Repository, EntityRepository, getRepository, } from "typeorm";
import { TodoItem } from "./todo-item.entity";
import { CreateTodoInputDto } from "./create-todo-input.dto";
import { Logger, InternalServerErrorException } from "@nestjs/common";
import { GetTodosInputDto } from "./get-todos-input.dto";
import { User } from "../user/user.entity";
import { AddTodoConversationInputDto } from './add-todo-conversation-input.dto';
import { TodoConversation } from './todo-conversation.entity';
import { plainToClass } from 'class-transformer';
// import { paginate, Pagination, } from 'nestjs-typeorm-paginate';
import { TodoLabel } from './todo-label.entity';
import { IPaginatedResponse } from '@nx-taskman/logics';
// import { TodoItemLabelsTodoLabel } from './todo-item-labels-todo-label.entity';

@EntityRepository(TodoItem)
export class TodoRepository extends Repository<TodoItem> {
  private logger = new Logger('TodoRepository');

  /**
   * 할일 목록을 페이지 단위로 읽어서 반환
   * @param filterDto 
   * @param user 
   */
  async getTodos(
    filterDto: GetTodosInputDto,
    user: User
  ): Promise<IPaginatedResponse<TodoItem>> {
    const { paging, search } = filterDto;
    const label = 4;
    
    // !!! query builder 조인 쿼리로 페이지 행수만큼 잘라서 쿼리하기가 어려움
    // find 함수에 의해서 자동으로 TaskLabel이 쿼리되도록해야 개수를 맞춰서 반환 받을 수 있음
    const qb = this.createQueryBuilder('todo');
    qb.where('todo.userId = :userId', { userId: user.id });
    if (label) {
      qb.innerJoinAndSelect('todo.labels', 'labels', 'labels.id = :label', {label})
      .orderBy('todo.id')
      .skip()
      .take(5);
      // qb.andWhere(qb => {
      //   const subQuery = qb.subQuery()
      //       .select("itemLabel.todoItemId")
      //       .from(TodoItemLabelsTodoLabel, "itemLabel")
      //       .where("itemLabel.todoLabelId = :label", {label})
      //       .getQuery();
      //   return "todo.id IN " + subQuery; 
      // });
    } else {
      // qb.innerJoinAndSelect('todo.labels', 'labels')
      //   .skip((paging.page - 1) * paging.limit)
      //   .take(paging.limit);
    }

    if (search) {
      // 괄호가 없으면 OR가 최상단 연산자로 인식되므로 꼭 괄호안에 OR 넣어야 함
      qb.andWhere(`(todo.title LIKE :search OR todo.notes LIKE :search)`, { search: `%${search}%` });
    }

    try {
      const [todos, cnt] = await qb.getManyAndCount();
      console.log(qb.getQuery());
      console.log(qb.getSql());
      const paginatedTodos = {items: todos, page: paging.page, itemCount: paging.itemCount, totalItems: cnt, pageCount: 2};
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