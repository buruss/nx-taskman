var cfg = require('./default');

module.exports = {
  ...cfg,
  production: false,
  db: {
    ...cfg.db,
    host: 'pgdev.c2zonom00f2n.ap-northeast-2.rds.amazonaws.com',
    username: 'postgres',
    password: 'dhvltmzhfldk',
    synchronize: true
  },
  jwt: {
    ...cfg.jwt,
    secret: 'topSecret51'
  }
};
