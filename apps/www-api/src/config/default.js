module.exports = {
  apiServer: {
    host: 'http://localhost',
    port: 4000,
  },
  nextServer: {
    host: 'http://localhost',
    port: 3000,
  },
  db: {
    type: 'postgres',
    port: 5432,
    database: 'taskmanagement',
  },
  jwt: {
    expiresIn: 3600, // 초단위. 1 hour
  },
};