import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getConfig } from '../config';
import { User } from '../user/user.entity';
import { Task } from '../task/task.entity';
import { TaskDetail } from '../task/task-detail.entity';
import { TodoConversation } from '../todo/todo-conversation.entity';
import { TodoItem } from '../todo/todo-item.entity';
import { TodoLabel } from '../todo/todo-label.entity';
// import { TodoItemLabelsTodoLabel } from '../todo/todo-item-labels-todo-label.entity';

const config = getConfig().db;

console.log('config = ', config);
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  // entities: [__dirname + '/../**/*.entity.{js,ts}'], // , __dirname + '/../../../apps/www/**/*.entity.{js,ts}'],
  entities: [
    TaskDetail,
    User,
    Task,
    TodoLabel,
    TodoConversation,
    TodoItem,
    // TodoItemLabelsTodoLabel
  ],
  synchronize: config.synchronize, // 스키마를 매번 동기화, 출시 버전에서는 제거하는 것이 바람직
};
