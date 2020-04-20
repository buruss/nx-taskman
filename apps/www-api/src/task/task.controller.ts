import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, UseGuards, Logger, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskStatus } from "@nx-taskman/constants";
import { CreateTaskInput } from './create-task.input';
import { GetTasksArgs } from './get-tasks.args';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/auth.decorator';

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
    @Query() filterArgs: GetTasksArgs,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all the tasks. Filter: ${JSON.stringify(filterArgs)}`);
    return this.taskService.getTasks(filterArgs, user);
  }

  @Get('/:tid')
  getTaskById(
    @Param('tid') id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  @UsePipes()
  createTask(
    @Body() createTaskInput: CreateTaskInput,
    @GetUser() user: User,
  ) {
    this.logger.verbose(`User "${user.username}" creating task. DTO: ${JSON.stringify(createTaskInput)}`);
    return this.taskService.createTask(createTaskInput, user);
  }

  @Delete('/:tid')
  deleteTask(
    @Param('tid') id: number,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.taskService.deleteTask(id, user);
  }

  @Patch('/:tid/st')
  updateTaskStatus(
    @Param('tid') id: number,
    @Body('st', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
