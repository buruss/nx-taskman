import { Args, Mutation, Resolver, Query, Parent, ResolveProperty } from '@nestjs/graphql';
import { AuthService } from '../../services/auth/auth.service';
import { SignUpInputDto } from '../dto/sign-up-input.dto';
import { SignInInputDto } from '../dto/sign-in-input.dto';
import { User } from '../../services/auth/user.entity';
import { UseGuards, } from '@nestjs/common';
import { GqlAuthGuard } from '../../services/auth/graphql-auth.guard';
import { GqlUser } from '../../services/auth/get-user.decorator';
import { AuthTokenDto } from 'apps/www/server/controllers/dto/auth-token.dto';
import { Task } from '../../services/task/task.entity';
import { TaskService } from '../../services/task/task.service';

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
  signIn(
    @Args('input') signInInputDto: SignInInputDto,
  ): Promise<AuthTokenDto> {
    return this.authService.signIn(signInInputDto);
  }

  // User Entity안에 @Field(() => [Task]) tasks 선언이 필요함
  @ResolveProperty()
  tasks(@Parent() parent: User): Promise<Task[]> {
    return this.taskService.getTasks({}, parent);
  }
}