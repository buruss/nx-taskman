/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  // Nest app 인스턴스 생성
  const app = await NestFactory.create(AppModule);

  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost::' + port);
  });
}

bootstrap();
