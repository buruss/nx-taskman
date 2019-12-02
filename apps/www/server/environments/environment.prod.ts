import env from './default';

export default {
  ...env,
  production: true,
  db: {
    ...env.db,
    synchronize: false
  }
};
