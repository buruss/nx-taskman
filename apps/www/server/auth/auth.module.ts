import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import env from '../environments/environment';

const jwtConfig = env.jwt;

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn, // 1 hour
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    AuthService,
  ]
})
export class AuthModule { }
