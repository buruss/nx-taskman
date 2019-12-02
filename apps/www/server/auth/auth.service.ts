import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../../lib/dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string; }> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 토큰에 담을 데이터 구조. 맘대로 만들어도 되지만, 비번처럼 민감한 데이터는 넣으면 안 됨.
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`);
    return { accessToken };
  }
}
