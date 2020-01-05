import { Args, Mutation, Resolver, Query, Context, GraphQLExecutionContext, } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInputDto } from './sign-up-input.dto';
import { SignInInputDto } from './sign-in-input.dto';
import { User } from '../user/user.entity';
import { UseGuards, } from '@nestjs/common';
import { GqlAuthGuard } from './graphql-auth.guard';
import { GqlUser, ResGql } from './auth.decorator';
import { AuthTokenDto } from './auth-token.dto';
import { TaskService } from '../task/task.service';
import { Response } from 'express';

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

  @Mutation(() => User)
  signUp(
    @Args('input') signUpInputDto: SignUpInputDto,
  ): Promise<User> {
    return this.authService.signUp(signUpInputDto);
  }

  @Mutation(() => AuthTokenDto)
  async signIn(
    @Args('input') signInInputDto: SignInInputDto,
    @ResGql() res: Response,
  ): Promise<AuthTokenDto> {
    const token = await this.authService.signIn(signInInputDto);
    // 쿠키에 토큰 설정
    res.cookie('token', token.accessToken, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24) * 31, });
    return token;
  }

  @Mutation(() => String)
  signOut(): string {
    return 'bye';
  }

  // 아래와 같이 ResolveProperty를 쓰면 N+1 쿼리 문제로 성능이 떨어지므로 사용하지 않음
  // loadEagerRelations true를 사용하거나 조인쿼리로 자식 테이블을 쿼리하는 것이 바람직
  // User Entity안에 @Field(() => [Task]) tasks 선언이 필요함
  // @ResolveProperty()
  // tasks(@Parent() parent: User): Promise<Task[]> {
  //   return this.taskService.getTasks({}, parent);
  // }
}