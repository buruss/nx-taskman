import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ParseIntPipe, UseGuards, Logger, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoInputDto } from './create-todo-input.dto';
import { GetTodosInputDto } from './get-todos-input.dto';
import { TodoItem } from './todo-item.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/auth.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';

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
    @Query() filterDto: GetTodosInputDto,
    @GetUser() user: User,
  ): Promise<Pagination<TodoItem>> {
    this.logger.verbose(`User "${user.username}" retrieving all the todos. Filter: ${JSON.stringify(filterDto)}`);
    return this.todoService.getTodos(filterDto, user);
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
    @Body() createTodoDto: CreateTodoInputDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(`User "${user.username}" creating todo. DTO: ${JSON.stringify(createTodoDto)}`);
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Delete('/:id')
  deleteTodo(
    @Param('id', ParseIntPipe) id: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.todoService.deleteTodo(id, user);
  }
}
