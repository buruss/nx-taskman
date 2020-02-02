import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getConfig } from '../config';
import { User } from '../user/user.entity';
import { Task } from '../task/task.entity';
import { TaskDetail } from '../task/task-detail.entity';

const config = getConfig().db;

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
  ],
  synchronize: config.synchronize, // 스키마를 매번 동기화, 출시 버전에서는 제거하는 것이 바람직
};
