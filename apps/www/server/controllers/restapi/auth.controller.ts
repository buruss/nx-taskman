import { Controller, Post, Body, Get, UseGuards, UseInterceptors, ClassSerializerInterceptor, } from '@nestjs/common';
import { SignInInputDto } from '../dto/sign-in-input.dto';
import { AuthService } from '../../services/auth/auth.service';
import { SignUpInputDto } from '../dto/sign-up-input.dto';
import { User } from '../../services/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../services/auth/get-user.decorator';
import { AuthTokenDto } from 'apps/www/server/controllers/dto/auth-token.dto';

@Controller('api/auth')
// 아래 Intercepter는 User Entity를 반환하면 매핑된 필드들만 Response로 내려보내도록 해줌
// 상세한 매핑은 Entity 클래스 안의 Exclude, Expose Decorator로 확인
@UseInterceptors(ClassSerializerInterceptor)
export class ApiAuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(AuthGuard())
  @Get('/me')
  me(@GetUser() user: User): User {
    return user;
  }

  @Post('/signup')
  signUp(@Body() signUpInputDto: SignUpInputDto): Promise<User> {
    return this.authService.signUp(signUpInputDto);
  }

  @Post('/signin')
  signIn(@Body() signInInputDto: SignInInputDto): Promise<AuthTokenDto> {
    return this.authService.signIn(signInInputDto);
  }

}