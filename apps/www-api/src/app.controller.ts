import { Controller, Get, Res, Req } from '@nestjs/common';
import { NextService } from '@nestpress/next';
import { GetUser } from './auth/get-user.decorator';
import { User } from './user/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly next: NextService,
  ) { }

  @Get()
  index(@GetUser() user: User, @Req() req, @Res() res) {
    return this.next.render('/index', { data: user }, req, res);
  }
}