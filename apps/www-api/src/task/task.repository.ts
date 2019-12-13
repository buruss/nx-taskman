import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskInputDto } from "./create-task-input.dto";
import { TaskStatus } from "@nx-taskman/constants";
import { Logger, InternalServerErrorException } from "@nestjs/common";
import { GetTasksArgsDto } from "./get-tasks-args.dto";
import { User } from "../user/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  async getTasks(
    filterDto: GetTasksArgsDto,
    user: User
  ): Promise<Task[]> {
    const { st: status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere(`task.status = :status`, { status });
    }

    if (search) {
      // 괄호가 없으면 OR가 최상단 연산자로 인식되므로 꼭 괄호안에 OR 넣어야 함
      query.andWhere(`(task.title LIKE :search OR task.description LIKE :search)`, { search: `%${search}%` });
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to get tasks for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTask(
    createTaskDto: CreateTaskInputDto,
    user: User
  ): Promise<Task> {
    const task = createTaskDto.toEntity();

    task.status = TaskStatus.OPEN;
    task.user = user;

    try {
      await task.save();
    } catch (error) {
      this.logger.error(`Failed to create a task for user "${user.username}". DTO: ${createTaskDto}`, error.stack);
      throw new InternalServerErrorException();
    }
    // 민감한 정보가 포함되어 있으므로 삭제 후 반환
    delete task.user;
    return task;
  }

}