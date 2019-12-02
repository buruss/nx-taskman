import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from '../../tasks/tasks.service';
import { TaskStatus } from "../../../lib/task-status.enum";
import { CreateTaskDto } from '../../../lib/dto/create-task.dto';
import { GetTasksFilterDto } from '../../../lib/dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from '../../tasks/pipes/task-status-validation.pipe';
import { Task } from '../../tasks/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../auth/user.entity';
import { GetUser } from '../../auth/get-user.decorator';

@Controller('api/tasks')
@UseGuards(AuthGuard())
export class ApiTasksController {
  private logger = new Logger('TasksController');

  constructor(private taskService: TasksService) { }

  @Get()
  GetTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all the tasks. Filter: ${JSON.stringify(filterDto)}`);
    return this.taskService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(`User "${user.username}" creating task. DTO: ${JSON.stringify(createTaskDto)}`);
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
