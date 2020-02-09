import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../user/user.entity';
import { getConfig } from '../config';
import { UserService } from '../user/user.service';
import { Request } from 'express';

const cookieExtractor = (req: Request): string | null => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
  ) {
    super({
      // 처음에는 아래와 같이 bearer token을 사용했는데,
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // next.js에서 사용하기에는 쿠키 방식이 편리한 듯 해서 쿠키 방식으로 변경함
      jwtFromRequest: cookieExtractor, 
      secretOrKey: getConfig().jwt.secret,
    });
  }

  // 액세스토큰을 디코딩하여 얻은 payload (username)를 이용하여 user 객체를 찾아 반환
  // 그러면 passport가 req 객체에 user 속성으로 붙여줌
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}