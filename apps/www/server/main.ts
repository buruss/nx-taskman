import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextModule } from '@nestpress/next';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { getConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  app.useLogger(app.get('NestWinston'));

  // 개발환경에서는 cors 활성화
  const dev = process.env.NODE_ENV !== 'production';
  if (dev) {
    app.enableCors();
  } else {
    app.enableCors()
  }

  /**
   * Request 에 담긴 데이터를 입력체크해줄 뿐 아니라 Class형으로 형변환까지 해주도록함. 자주 쓰므로 Global로 사용함
   * 예를 들어 GraphQL InputType ArgType을 DTO Class 형으로 변환해서 DTO Class 안의 메서드까지 사용하고 싶을 경우가 있음(ToEntity 메서드 등)
   * ValidationPipe({ transform: true }) Decorator를 사용하면 됨.
   * 먼저 @UseInterceptors(ClassSerializerInterceptor)를 사용해 봤는데, 
   * Response하려는 Class롤 DTO로 변환해주지만, Request의 DTO를 Class로 변환해주지는 못함
   * @UsePipes(plainToClass(SignUpInputDto)) Decorator 도 써봤지만 안 됨
   * @param signUpInputDto 
   */
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = getConfig().server.port;
  const projectRoot = path.join(__dirname, '..');
  app.get(NextModule).prepare({ dev, dir: projectRoot }).then(() => {
    app.listen(port, () => {
      console.log('Listening at http://localhost:' + port + '/'); // + globalPrefix);
    });
  });
}

bootstrap();
