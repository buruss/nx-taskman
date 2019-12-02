import { Controller, Post, Body, ValidationPipe, } from '@nestjs/common';
import { AuthCredentialsDto } from '../../../lib/dto/auth-credentials.dto';
import { AuthService } from '../../auth/auth.service';

@Controller('api/auth')
export class ApiAuthController {
  constructor(
    private authService: AuthService
  ) {
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string; }> {
    return this.authService.signIn(authCredentialsDto);
  }

}