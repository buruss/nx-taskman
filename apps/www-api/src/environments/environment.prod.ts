import env from './base';

export default {
  ...env,
  production: true,
  db: {
    ...env.db,
    synchronize: false
  }
};
