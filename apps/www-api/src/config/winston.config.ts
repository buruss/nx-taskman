import winston from 'winston';
import * as path from 'path';

// require 구문은 typescript 컴파일 오류 발생시킴.
import DailyRotateFile from 'winston-daily-rotate-file';

export const winstonOptions: winston.LoggerOptions = { // winston 로깅 설정
  level: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'silly' : 'debug',
  transports: [
    new (winston.transports.Console)(),
    new (DailyRotateFile)({
      datePattern: 'YYYY-MM-DD',
      dirname: path.resolve(__dirname, `../log/`),
      filename: `app_%DATE%.log`,
      maxFiles: '7d',
      // timestamp: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS'),
    })
  ]
};