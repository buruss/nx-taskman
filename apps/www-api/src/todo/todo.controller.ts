import { Controller, Get, Post, Body, Param, Delete, Query, UsePipes, UseGuards, Logger, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './create-todo.input';
import { GetTodosInput } from './get-todos.input';
import { TodoItem, PaginatedTodoItems } from './todo-item.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/auth.decorator';

@Controller('api/todos')
@UseGuards(AuthGuard())
// 아래 Intercepter는 User Entity를 반환하면 매핑된 필드들만 Response로 내려보내도록 해줌
// 상세한 매핑은 Entity 클래스 안의 Exclude, Expose Decorator로 확인
@UseInterceptors(ClassSerializerInterceptor)
export class ApiTodoController {
  private logger = new Logger('TodosController');

  constructor(private todoService: TodoService) { }

  @Get()
  getTodos(
    @Query() filterInput: GetTodosInput,
    @GetUser() user: User,
  ): Promise<PaginatedTodoItems> {
    this.logger.verbose(`User "${user.username}" retrieving all the todos. Filter: ${JSON.stringify(filterInput)}`);
    return this.todoService.getTodos(filterInput, user);
  }

  @Get('/:tid')
  getTodoById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<TodoItem> {
    return this.todoService.getTodoById(id, user);
  }

  @Post()
  @UsePipes()
  createTodo(
    @Body() createTodoInput: CreateTodoInput,
    @GetUser() user: User,
  ) {
    this.logger.verbose(`User "${user.username}" creating todo. DTO: ${JSON.stringify(createTodoInput)}`);
    return this.todoService.createTodo(createTodoInput, user);
  }

  @Delete('/:id')
  deleteTodo(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.todoService.deleteTodo(id, user);
  }
}
