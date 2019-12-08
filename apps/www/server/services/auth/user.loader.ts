import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Injectable()
export class UserLoader implements NestDataLoader<number, User> {
  constructor(private readonly authService: AuthService) { }

  generateDataLoader(): DataLoader<number, User> {
    return new DataLoader<number, User>(keys => this.authService.findByIds(keys));
  }
}