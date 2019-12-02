import { PassportStrategy} from '@nestjs/passport';
import { Strategy, ExtractJwt} from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import env from '../environments/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || env.jwt.secret,
        });
    }

    // 액세스토큰을 디코딩하여 얻은 payload (username)를 이용하여 user 객체를 찾아 반환
    async validate(payload: JwtPayload): Promise<User> {
        const {username} = payload;
        const user = await this.userRepository.findOne({username});

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}