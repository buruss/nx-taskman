import env from './default';

export default {
  ...env,
  production: false,
  db: {
    ...env.db,
    host: 'pgdev.c2zonom00f2n.ap-northeast-2.rds.amazonaws.com',
    username: 'postgres',
    password: 'dhvltmzhfldk',
    synchronize: true
  },
  jwt: {
    ...env.jwt,
    secret: 'topSecret51'
  }
};
