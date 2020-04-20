import { Args, Mutation, Resolver, Query, } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './sign-up.input';
import { SignInInput } from './sign-in.input';
import { User } from '../user/user.entity';
import { UseGuards, } from '@nestjs/common';
import { GqlAuthGuard } from './graphql-auth.guard';
import { GqlUser, ResGql } from './auth.decorator';
import { AuthTokenOutput } from './auth-token.output';
import { Response } from 'express';
import { getConfig } from '../config';

@Resolver(User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  me(
    @GqlUser() user: User,
  ): User {
    return user;
  }

  @Mutation(() => User)
  signUp(
    @Args('input') signUpInput: SignUpInput,
  ): Promise<User> {
    return this.authService.signUp(signUpInput);
  }

  // 아직 nest.js에서 쿠키를 직접 지원하지 않기 때문에
  // express response 객체를 이용하여 쿠키를 전송한다.
  @Mutation(() => AuthTokenOutput)
  async signIn(
    @Args('input') signInInput: SignInInput,
    @ResGql() res: Response,
  ): Promise<AuthTokenOutput> {
    const token = await this.authService.signIn(signInInput);
    // 쿠키에 토큰 설정
    res.cookie('token', token.token, { httpOnly: true, maxAge: getConfig().jwt.expiresIn * 1000, });
    return token;
  }

  @Query(() => String)
  signOut(
    @ResGql() res: Response,
  ) {
    res.clearCookie('token');
    return 'bye';
  }

  
  // 아래와 같이 ResolveProperty를 쓰면 N+1 쿼리 문제로 성능이 떨어지므로 사용하지 않음
  // loadEagerRelations true를 사용하거나 조인쿼리로 자식 테이블을 쿼리하는 것이 바람직
  // User Entity안에 @Field(type => [Task]) tasks 선언이 필요함
  // @ResolveProperty()
  // tasks(@Parent() parent: User): Promise<Task[]> {
  //   return this.taskService.getTasks({}, parent);
  // }
}