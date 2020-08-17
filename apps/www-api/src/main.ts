import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getConfig } from './config';
import cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './config/winston.config';

async function bootstrap() {
  // 개발환경에서는 cors 활성화
  const dev = process.env.NODE_ENV !== 'production';

  const {nextServer, apiServer} = getConfig();

  // 다른 도메인에서 쿠키 헤더를 전송 받으려면 cors 설정 필요
  const cors: CorsOptions = {
    origin: `${nextServer.host}:${nextServer.port}`,
    credentials: true,
  };

  const logger = WinstonModule.createLogger(winstonOptions);
  const app = await NestFactory.create(AppModule, {
    cors, 
    // winston을 앱 전체 기본 로거로 사용하기 위해서 app.module에서 생성하지 않고 bootstrap에서 생성하여 전달함
    logger,
  });

  /**
   * Request 에 담긴 데이터를 입력체크해줄 뿐 아니라 Class형으로 형변환까지 해주도록함. 자주 쓰므로 Global로 사용함
   * 예를 들어 GraphQL InputType ArgType을 DTO Class 형으로 변환해서 DTO Class 안의 메서드까지 사용하고 싶을 경우가 있음(ToEntity 메서드 등)
   * ValidationPipe({ transform: true }) Decorator를 사용하면 됨.
   * 먼저 @UseInterceptors(ClassSerializerInterceptor)를 사용해 봤는데, 
   * Response하려는 Class롤 DTO로 변환해주지만, Request의 DTO를 Class로 변환해주지는 못함
   * @UsePipes(plainToClass(SignUpInput)) Decorator 도 써봤지만 안 됨
   */
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // 쿠키 기반 토큰 인증을 위해서 필요함. jwt.strategy.ts 참고
  app.use(cookieParser());

  app.listen(apiServer.port, () => {
    logger.log('Listening at http://localhost:' + apiServer.port + '/');
  });
}

bootstrap();