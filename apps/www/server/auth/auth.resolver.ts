import { Args, Mutation, Resolver, Query, Parent, ResolveProperty } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInputDto } from './sign-up-input.dto';
import { SignInInputDto } from './sign-in-input.dto';
import { User } from '../user/user.entity';
import { UseGuards, } from '@nestjs/common';
import { GqlAuthGuard } from './graphql-auth.guard';
import { GqlUser } from './get-user.decorator';
import { AuthTokenDto } from 'apps/www/server/auth/auth-token.dto';
import { TaskService } from '../task/task.service';

@Resolver(User)
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly taskService: TaskService) { }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  me(
    @GqlUser() user: User,
  ): User {
    return user;
  }

  @Mutation((UserInput) => User)
  signUp(
    @Args('input') signUpInputDto: SignUpInputDto,
  ): Promise<User> {
    return this.authService.signUp(signUpInputDto);
  }

  @Mutation(() => AuthTokenDto)
  signIn(
    @Args('input') signInInputDto: SignInInputDto,
  ): Promise<AuthTokenDto> {
    return this.authService.signIn(signInInputDto);
  }

  // 아래와 같이 ResolveProperty를 쓰면 N+1 쿼리 문제로 성능이 떨어지므로 사용하지 않음
  // loadEagerRelations true를 사용하거나 조인쿼리로 자식 테이블을 쿼리하는 것이 바람직
  // User Entity안에 @Field(() => [Task]) tasks 선언이 필요함
  // @ResolveProperty()
  // tasks(@Parent() parent: User): Promise<Task[]> {
  //   return this.taskService.getTasks({}, parent);
  // }
}