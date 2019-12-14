/**
 * node-config-ts, nestjs-dotenv, nestjs-config 등을 다 사용해봤지만
 * env 형식 타입 체킹 안되는 문제
 * app.module 생성되기 전에 config 인스턴스 생성이 어렵고 그 후 전역 공유하기 어려운 문제
 * 등의 이유로 외부 js에서 읽어들여서 캐시하고 사용하는 방식으로 결정함.
 * 어느 소스에서든 getConfig() 호출 후 속성 사용하면 됨
 */
import { IConfig } from './config.interface';
import * as path from 'path';

let cachedCfg: IConfig;

/**
 * NODE_ENV 설정에 따라 환경 설정을 구분하여 로드하고,
 * 한 번 로드하면 캐시하여 재활용함
 */
export const getConfig = (): IConfig => {
  if (cachedCfg) {
    return cachedCfg;
  }
  // 경로를 NODE_ENV에 따라 결정하고 동적으로 로딩함
  const filePath = path.resolve('apps/config/', (process.env.NODE_ENV === 'production' ? 'production' : 'development') + '.js');
  cachedCfg = require(filePath);
  return cachedCfg;
};

export * from './graphql.config';
export * from './typeorm.config';
export * from './winston.config';
