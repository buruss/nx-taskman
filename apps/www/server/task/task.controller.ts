import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ParseIntPipe, UseGuards, Logger, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskStatus } from "../../lib/task-status.enum";
import { CreateTaskInputDto } from './create-task-input.dto';
import { GetTasksArgsDto } from './get-tasks-args.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('api/tasks')
@UseGuards(AuthGuard())
// 아래 Intercepter는 User Entity를 반환하면 매핑된 필드들만 Response로 내려보내도록 해줌
// 상세한 매핑은 Entity 클래스 안의 Exclude, Expose Decorator로 확인
@UseInterceptors(ClassSerializerInterceptor)
export class ApiTaskController {
  private logger = new Logger('TasksController');

  constructor(private taskService: TaskService) { }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksArgsDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all the tasks. Filter: ${JSON.stringify(filterDto)}`);
    return this.taskService.getTasks(filterDto, user);
  }

  @Get('/:tid')
  getTaskById(
    @Param('tid', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  @UsePipes()
  createTask(
    @Body() createTaskDto: CreateTaskInputDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(`User "${user.username}" creating task. DTO: ${JSON.stringify(createTaskDto)}`);
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete('/:tid')
  deleteTask(
    @Param('tid', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.taskService.deleteTask(id, user);
  }

  @Patch('/:tid/st')
  updateTaskStatus(
    @Param('tid', ParseIntPipe) id: number,
    @Body('tid', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
