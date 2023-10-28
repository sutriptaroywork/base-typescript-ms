import dotenv from 'dotenv';

dotenv.config();

export class AppConfig {
  static readonly SQL_DB_HOST = process.env.SQL_DB_HOST;
  static readonly SQL_DB_PORT = Number(process.env.SQL_DB_PORT || 3306);
  static readonly SQL_DB_NAME = String(process.env.SQL_DB_NAME);
  static readonly SQL_DB_USERNAME = String(process.env.SQL_DB_USERNAME);
  static readonly SQL_DB_PASSWORD = String(process.env.SQL_DB_PASSWORD);
  static readonly SQL_DIALECT = process.env.SQL_DIALECT || 'mysql';
  static readonly SQL_MAX_POOL = Number(process.env.SQL_MAX_POOL || 10);
  static readonly SQL_MIN_POOL = Number(process.env.SQL_MIN_POOL || 5);
  static readonly SQL_CONNECTION_LIMIT = Number(process.env.SQL_CONNECTION_LIMIT || 10);
  static readonly SQL_MAX_TIMEOUT = process.env.SQL_MAX_TIMEOUT || 5000;
  static readonly SQL_AQUIRE = process.env.SQL_AQUIRE;
  static readonly SQL_IDLE = process.env.SQL_IDLE;
  static readonly MONGO_DB_URL = String(process.env.MONGO_DB_URL);
  static readonly MONGO_DB_NAME = process.env.MONGO_DB_NAME;
  static readonly REDIS_URL = process.env.REDIS_URL;
  static readonly REDIS_PORT = Number(process.env.REDIS_PORT);
  static readonly REDIS_PASSWORD = process.env.REDIS_PASSWORD;
}
