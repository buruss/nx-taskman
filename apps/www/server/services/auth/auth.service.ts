import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInInputDto } from '../../controllers/dto/sign-in-input.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { SignUpInputDto } from '../../controllers/dto/sign-up-input.dto';
import { User } from './user.entity';
import { AuthTokenDto } from 'apps/www/server/controllers/dto/auth-token.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  me(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }

  signUp(signUpInputDto: SignUpInputDto): Promise<User> {
    return this.userRepository.signUp(signUpInputDto);
  }

  async signIn(signInInputDto: SignInInputDto): Promise<AuthTokenDto> {
    const username = await this.userRepository.validateUserPassword(signInInputDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 토큰에 담을 데이터 구조. 맘대로 만들어도 되지만, 비번처럼 민감한 데이터는 넣으면 안 됨.
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`);
    return { accessToken };
  }

  findByIds(ids: number[]): Promise<User[]> {
    return this.userRepository.findByIds(ids);
  }
}
