import { Module, forwardRef, Logger } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';
import { ApiTodoController } from './todo.controller';
import { TodoResolver } from './todo.resolver';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([TodoRepository]),
    UserModule,
  ],
  controllers: [
    ApiTodoController,
  ],
  providers: [
    TodoService,
    TodoResolver,
    Logger,
  ],
  exports: [TodoService],
})
export class TodoModule { }
