import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver'
import { ApiAuthController } from './auth.controller';
import { TaskModule } from '../task/task.module';
import { getConfig } from '../config';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

const jwtConfig = getConfig().jwt;

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn, // 1 hour
      },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => TaskModule),
  ],
  controllers: [
    ApiAuthController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthResolver,
    UserService,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    AuthService,
  ]
})
export class AuthModule { }
