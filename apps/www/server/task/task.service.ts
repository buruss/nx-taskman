import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from "../../lib/task-status.enum";
import { CreateTaskInputDto } from './create-task-input.dto';
import { GetTasksArgsDto } from './get-tasks-args.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {

  }

  getTasks(
    filterDto: GetTasksArgsDto,
    user: User,
  ): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  // getAllTasks(): Task[] {
  //     return this.tasks;
  // }

  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //     const {status, search} = filterDto;
  //     return this.tasks.filter(task => {
  //         return (
  //             (
  //                 !status 
  //                 || task.status === status
  //             ) 
  //             && (
  //                 !search 
  //                 || task.title.includes(search) 
  //                 || task.description.includes(search)
  //             )
  //         );
  //     })
  // }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createTask(
    createTaskDto: CreateTaskInputDto,
    user: User,
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: number, user: User): Promise<boolean> {
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return true;
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
