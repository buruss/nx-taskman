import { LoggerOptions, transports, format } from 'winston';
import * as path from 'path';

// require 구문은 typescript 컴파일 오류 발생시킴.
import DailyRotateFile from 'winston-daily-rotate-file';

const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const winstonOptions: LoggerOptions = { // winston 로깅 설정
  level: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'silly' : 'debug',
  format: format.combine(
    format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
    format.simple(),
    myFormat,
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      dirname: path.resolve(__dirname, `../log/`),
      filename: `app_%DATE%.log`,
      maxFiles: '7d',
    })
  ]
};