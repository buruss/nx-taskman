import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver'
import { ApiAuthController } from './auth.controller';
import { TaskModule } from '../task/task.module';
import { TodoModule } from '../todo/todo.module';
import { getConfig } from '../config';
import { UserModule } from '../user/user.module';

const jwtConfig = getConfig().jwt;

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn, 
      },
    }),
    forwardRef(() => TaskModule),
    forwardRef(() => TodoModule),
  ],
  controllers: [
    ApiAuthController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthResolver,
    // UserService, 다른 모듈에서 이미 export한 서비스를 여기서 다시 providers에 추가하면 "Nest can't resolve dependencies" 오류 발생
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    AuthService,
  ]
})
export class AuthModule { }
