import { Args, Mutation, Query, Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { GetTasksArgsDto } from './get-tasks-args.dto';
import { GqlUser } from '../auth/auth.decorator';
import { User } from '../user/user.entity';
import { Task } from './task.entity';
import { CreateTaskInputDto } from './create-task-input.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from '@nx-taskman/constants';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Loader } from 'nestjs-dataloader';
import { UserDataLoader } from '../user/user.loader';
import DataLoader from 'dataloader';
import { Field, Arg } from 'type-graphql';
import { UpdateTaskStatusArgsDto } from './update-task-status-args.dto';
import { TaskDetail } from './task-detail.entity';
import { AddTaskDetailInputDto } from './add-task-detail-input.dto';

@Resolver(() => Task)
@UseGuards(GqlAuthGuard)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
  ) { }

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
    // enum 타입의 인자를 받기 위해서는 ArgType 또는 InputType을 반드시 선언해야 함
    // @Arg() 로 type을 명시해도 "You need to provide explicit type" 오류가 계속 발생해서
    @Args() updateTaskStatusArgs: UpdateTaskStatusArgsDto,
    // @Args('tid', ParseIntPipe) tid: number,
    // @Arg('st', type => TaskStatus) @Args('st', TaskStatusValidationPipe) st: TaskStatus,
    @GqlUser() user: User,
  ): Promise<Task> {
    const {tid, st} =updateTaskStatusArgs;
    return this.taskService.updateTaskStatus(tid, st, user);
  }

  // Task Entity안에 @Field(() => User) user 선언이 필요함
  // 아래 dataloader를 사용하면 이 속성이 호출될 때마다 캐시에 저장하여
  // 만일 동일한 userid를 요청할 경우 캐시에서 빠르게 반환
  @ResolveProperty()
  user(
    @Parent() parent: Task,
    @Loader(UserDataLoader.name) userDataLoader: DataLoader<User['id'], User>,
  ): Promise<User> {
    return userDataLoader.load(parent.userId)
  }

  @Mutation(() => TaskDetail)
  addTaskDetail(
    @Args('input') addTaskDetailInputDto: AddTaskDetailInputDto,
  ): Promise<TaskDetail> {
    return this.taskService.addTaskDetail(addTaskDetailInputDto);
  }

  @Query(() => [TaskDetail])
  getTaskDetails(
    @Args('tid', ParseIntPipe) tid: number,
  ): Promise<TaskDetail[]> {
    return this.taskService.getTaskDetails(tid);
  }

}