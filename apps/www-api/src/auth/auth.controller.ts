import { Controller, Post, Body, Get, UseGuards, UseInterceptors, ClassSerializerInterceptor, Res, } from '@nestjs/common';
import { SignInInputDto } from './sign-in-input.dto';
import { AuthService } from './auth.service';
import { SignUpInputDto } from './sign-up-input.dto';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './auth.decorator';
import { AuthTokenDto } from './auth-token.dto';
import { Response } from 'express';


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
  async signIn(
    @Body() signInInputDto: SignInInputDto,
    @Res() res: Response,
  ): Promise<AuthTokenDto> {
    const token = await this.authService.signIn(signInInputDto);
    // 쿠키에 토큰 설정
    res.cookie('token', token.token, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24) * 31, });
    res.send(token);
    return token;
  }

}