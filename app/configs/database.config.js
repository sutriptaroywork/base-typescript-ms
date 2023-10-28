module.exports = {
  username: process.env.SQL_DB_USERNAME,
  password: process.env.SQL_DB_PASSWORD,
  database: process.env.SQL_DB_NAME,
  host: process.env.SQL_DB_HOST,
  port: process.env.SQL_DB_PORT,
  dialect: process.env.SQL_DIALECT || 'mysql',
  pool: {
    max: parseInt(process.env.SQL_MAX_POOL) || 10,
    min: parseInt(process.env.SQL_MIN_POOL) || 5,
    acquire: 30000,
    idle: 1000,
  },
};
