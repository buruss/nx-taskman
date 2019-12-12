var cfg = require('./default');

module.exports = {
  ...cfg,
  production: true,
  db: {
    ...cfg.db,
    synchronize: false
  }
};
