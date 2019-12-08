import { Args, Mutation, Query, Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { ParseIntPipe, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { TaskService } from '../../services/task/task.service';
import { GetTasksArgsDto } from '../dto/get-tasks-args.dto';
import { GqlUser } from '../../services/auth/get-user.decorator';
import { User } from '../../services/auth/user.entity';
import { Task } from '../../services/task/task.entity';
import { CreateTaskInputDto } from '../dto/create-task-input.dto';
import { TaskStatusValidationPipe } from '../../services/task/pipes/task-status-validation.pipe';
import { TaskStatus } from '../../../lib/task-status.enum';
import { GqlAuthGuard } from '../../services/auth/graphql-auth.guard';
import { AuthService } from '../../services/auth/auth.service';

@Resolver(() => Task)
@UseGuards(GqlAuthGuard)
export class TaskResolver {
  constructor(private readonly taskService: TaskService, private readonly authService: AuthService) { }

  @Query(() => [Task])
  getTasks(
    @Args() filterDto: GetTasksArgsDto,
    @GqlUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, user);
  }

  @Query(() => Task)
  getTaskById(
    @Args('tid', ParseIntPipe) id: number,
    @GqlUser() user: User,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Mutation(() => Task)
  createTask(
    @Args('input') createTaskDto: CreateTaskInputDto,
    @GqlUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Mutation(() => Boolean)
  deleteTask(
    @Args('tid', ParseIntPipe) id: number,
    @GqlUser() user: User,
  ): Promise<boolean> {
    return this.taskService.deleteTask(id, user);
  }

  @Mutation(() => Task)
  updateTaskStatus(
    @Args('tid', ParseIntPipe) id: number,
    @Args('st', TaskStatusValidationPipe) status: TaskStatus,
    @GqlUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, user);
  }

  // Task Entity안에 @Field(() => User) user 선언이 필요함
  @ResolveProperty()
  user(@Parent() parent: Task, @GqlUser() user: User): User {
    return user;
  }
}