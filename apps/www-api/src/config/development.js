var cfg = require('./default');

module.exports = {
  ...cfg,
  production: false,
  db: {
    ...cfg.db,
    host: 'localhost',
    username: 'postgres',
    password: 'dhvltmzhfldk',
    synchronize: true
  },
  jwt: {
    ...cfg.jwt,
    secret: 'topSecret51'
  }
};
