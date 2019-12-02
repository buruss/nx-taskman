import { Controller, Get, Res, Req } from '@nestjs/common';
import { NextService } from '@nestpress/next';

@Controller()
export class HomeController {
  constructor(
    private readonly next: NextService,
  ) { }

  @Get()
  index(@Req() req, @Res() res) {
    return this.next.render('/index', { data: [{ id: 1, title: 'a' }, { id: 2, title: 'b' }] }, req, res);
  }
}