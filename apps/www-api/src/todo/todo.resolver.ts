import { Args, Mutation, Query, Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { GetTodosInput } from './get-todos.input';
import { GqlUser } from '../auth/auth.decorator';
import { User } from '../user/user.entity';
import { TodoItem, PaginatedTodoItems } from './todo-item.entity';
import { CreateTodoInput } from './create-todo.input';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
// import { Loader } from 'nestjs-dataloader';
// import { UserDataLoader } from '../user/user.loader';
// import DataLoader from 'dataloader';
import { TodoConversation } from './todo-conversation.entity';
import { AddTodoConversationInput } from './add-todo-conversation.input';
import { TodoLabel } from './todo-label.entity';
import { TodoInitialData, } from './todo-initial-data.output';

@Resolver(() => TodoItem)
@UseGuards(GqlAuthGuard)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
  ) { }

  @Query(() => PaginatedTodoItems)
  getTodos(
    @Args('input') filterInput: GetTodosInput,
    @GqlUser() user: User,
  ): Promise<PaginatedTodoItems> {
    return this.todoService.getTodos(filterInput, user);
  }

  @Query(() => TodoItem)
  getTodoById(
    @Args('id') id: string,
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
    @Args('input') filterInput: GetTodosInput,
    @GqlUser() user: User,
  ): Promise<TodoInitialData> {
    const todoItemsPromise = this.todoService.getTodos(filterInput, user);
    const todoLabelsPromise = this.todoService.getTodoLabels();
    const data = await Promise.all([todoItemsPromise, todoLabelsPromise]);
    return {paginatedTodoItems: data[0], todoLabels: data[1]};
  }

  @Mutation(() => TodoItem)
  createTodo(
    @Args('input') createTodoInput: CreateTodoInput,
    @GqlUser() user: User,
  ): Promise<TodoItem> {
    return this.todoService.createTodo(createTodoInput, user);
  }

  @Mutation(() => Boolean)
  deleteTodo(
    @Args('id') id: string,
    @GqlUser() user: User,
  ): Promise<boolean> {
    return this.todoService.deleteTodo(id, user);
  }

  // 2020-04-11 buruss 모든 패키지 최신 업데이트 후부터 dataloader 오류가 발생하여 사용 안 함
  // Todo Entity안에 @Field(type => User) user 선언이 필요함
  // 아래 dataloader를 사용하면 이 속성이 호출될 때마다 캐시에 저장하여
  // 만일 동일한 userid를 요청할 경우 캐시에서 빠르게 반환
  // @ResolveProperty()
  // user(
  //   @Parent() parent: TodoItem,
  //   @Loader(UserDataLoader.name) userDataLoader: DataLoader<User['id'], User>,
  // ): Promise<User> {
  //   return userDataLoader.load(parent.userId)
  // }

  @Mutation(() => TodoConversation)
  addTodoConversation(
    @Args('input') addTodoDetailInput: AddTodoConversationInput,
    // 자동 형 변환이 잘 될지...
    // @Args('input') todoConversation: TodoConversation,
  ): Promise<TodoConversation> {
    return this.todoService.addTodoConversation(addTodoDetailInput);
  }

  @Query(() => [TodoConversation])
  getTodoConversations(
    @Args('todoId') todoId: string,
  ): Promise<TodoConversation[]> {
    return this.todoService.getTodoConversations(todoId);
  }

}