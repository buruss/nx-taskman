import env from './base';

export default {
  ...env,
  production: false,
  db: {
    ...env.db,
    host: '127.0.0.1',
    username: 'postgres',
    password: 'postgres',
    synchronize: true
    },
  jwt: {
    ...env.jwt,
    secret: 'topSecret51'
  }
};
