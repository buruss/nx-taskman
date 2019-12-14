import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { User } from './user.entity';
import { UserService } from './user.service';

@Injectable()
export class UserDataLoader implements NestDataLoader<number, User> {
  constructor(private readonly userService: UserService) { }

  generateDataLoader(): DataLoader<number, User> {
    return new DataLoader<number, User>(async keys => {
      const data = await this.userService.findByIds(keys);
      return keys.map(key => data.find(entity => entity.id === key)); // 키 배열과 일치, 없는 경우 undefined 반환
    });
  }
}