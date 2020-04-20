import { Repository, EntityRepository, getRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskInput } from "./create-task.input";
import { TaskStatus } from "@nx-taskman/constants";
import { Logger, InternalServerErrorException } from "@nestjs/common";
import { GetTasksArgs } from "./get-tasks.args";
import { User } from "../user/user.entity";
import { AddTaskDetailInput } from './add-task-detail.input';
import { TaskDetail } from './task-detail.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  async getTasks(
    filterArgs: GetTasksArgs,
    user: User
  ): Promise<Task[]> {
    const { st: status, search } = filterArgs;
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
      this.logger.error(`Failed to get tasks for user "${user.username}", DTO: ${JSON.stringify(filterArgs)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTask(
    createTaskInput: CreateTaskInput,
    user: User
  ): Promise<Task> {
    const task = createTaskInput.toEntity();

    task.status = TaskStatus.OPEN;
    task.user = user;

    try {
      await task.save();
    } catch (error) {
      this.logger.error(`Failed to create a task for user "${user.username}". DTO: ${createTaskInput}`, error.stack);
      throw new InternalServerErrorException();
    }
    // 민감한 정보가 포함되어 있으므로 삭제 후 반환
    delete task.user;
    return task;
  }

  async addTaskDetail(
    addTaskDetailInput: AddTaskDetailInput,
  ): Promise<TaskDetail> {
    const taskDetail = addTaskDetailInput.toEntity();
    try {
      await taskDetail.save();
    } catch (error) {
      this.logger.error(`Failed to add a task detail for task "${taskDetail.detailType}"`, error.stack);
      throw new InternalServerErrorException();
    }
    return taskDetail;
  }

  
  async getTaskDetails(
    tid: number,
  ): Promise<TaskDetail[]> {
    const repo = getRepository(TaskDetail);
    
    try {
      const taskDetails = await repo.find({where: {taskId: tid}})
      return taskDetails;
    } catch (error) {
      this.logger.error(`Failed to get task details for task "${tid}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}