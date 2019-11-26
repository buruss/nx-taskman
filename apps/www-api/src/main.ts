/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(env);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useLogger(app.get('NestWinston'));

  // 개발환경에서는 cors 활성화
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  const port = process.env.PORT || env.server.port;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
    