import { Args, Mutation, Query, Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { GetTodosInputDto } from './get-todos-input.dto';
import { GqlUser } from '../auth/auth.decorator';
import { User } from '../user/user.entity';
import { TodoItem } from './todo-item.entity';
import { CreateTodoInputDto } from './create-todo-input.dto';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Loader } from 'nestjs-dataloader';
import { UserDataLoader } from '../user/user.loader';
import DataLoader from 'dataloader';
import { TodoConversation } from './todo-conversation.entity';
import { AddTodoConversationInputDto } from './add-todo-conversation-input.dto';
import { TodoLabel } from './todo-label.entity';
import { TodoInitialData, PaginatedTodoItems } from './todo-initial-data-output.dto';

@Resolver(() => TodoItem)
@UseGuards(GqlAuthGuard)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
  ) { }

  @Query(() => PaginatedTodoItems)
  getTodos(
    @Args('input') filterDto: GetTodosInputDto,
    @GqlUser() user: User,
  ): Promise<PaginatedTodoItems> {
    return this.todoService.getTodos(filterDto, user);
  }

  @Query(() => TodoItem)
  getTodoById(
    @Args('id', ParseIntPipe) id: string,
    @GqlUser() user: User,
  ): Promise<TodoItem> {
    return this.todoService.getTodoById(id, user);
  }

  @Query(() => [TodoLabel])
  getTodoLabels(): Promise<TodoLabel[]> {
    return this.todoService.getTodoLabels();
  }

  @Query(() => TodoInitialData)
  async getTodoInitialData(
    @Args('input') filterDto: GetTodosInputDto,
    @GqlUser() user: User,
  ): Promise<TodoInitialData> {
    const todoItemsPromise = this.todoService.getTodos(filterDto, user);
    const todoLabelsPromise = this.todoService.getTodoLabels();
    const data = await Promise.all([todoItemsPromise, todoLabelsPromise]);
    return {paginatedTodoItems: data[0], todoLabels: data[1]};
  }

  @Mutation(() => TodoItem)
  createTodo(
    @Args('input') createTodoDto: CreateTodoInputDto,
    @GqlUser() user: User,
  ): Promise<TodoItem> {
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Mutation(() => Boolean)
  deleteTodo(
    @Args('id') id: string,
    @GqlUser() user: User,
  ): Promise<boolean> {
    return this.todoService.deleteTodo(id, user);
  }

  // Todo Entity안에 @Field(type => User) user 선언이 필요함
  // 아래 dataloader를 사용하면 이 속성이 호출될 때마다 캐시에 저장하여
  // 만일 동일한 userid를 요청할 경우 캐시에서 빠르게 반환
  @ResolveProperty()
  user(
    @Parent() parent: TodoItem,
    @Loader(UserDataLoader.name) userDataLoader: DataLoader<User['id'], User>,
  ): Promise<User> {
    return userDataLoader.load(parent.userId)
  }

  @Mutation(() => TodoConversation)
  addTodoConversation(
    @Args('input') addTodoDetailInputDto: AddTodoConversationInputDto,
    // 자동 형 변환이 잘 될지...
    // @Args('input') todoConversation: TodoConversation,
  ): Promise<TodoConversation> {
    return this.todoService.addTodoConversation(addTodoDetailInputDto);
  }

  @Query(() => [TodoConversation])
  getTodoConversations(
    @Args('todoId') todoId: string,
  ): Promise<TodoConversation[]> {
    return this.todoService.getTodoConversations(todoId);
  }

}