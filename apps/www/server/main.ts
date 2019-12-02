import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './environments/environment';
import { NextModule } from '@nestpress/next';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(env);

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

  const port = process.env.PORT || env.server.port;
  const projectRoot = path.join(__dirname, '..');
  app.get(NextModule).prepare({ dev, dir: projectRoot }).then(() => {
    app.listen(port, () => {
      console.log('Listening at http://localhost:' + port + '/'); // + globalPrefix);
    });
  });
}

bootstrap();
