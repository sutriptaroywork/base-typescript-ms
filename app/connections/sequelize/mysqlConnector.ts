import { Sequelize, Dialect } from 'sequelize';

import { AppConfig } from '../../configs/config';

export default class MySQLConnection {
  private static INSTANCE: Sequelize;

  static createMySQLConnection() {
    if (!this.INSTANCE) {
      this.INSTANCE = new Sequelize(AppConfig.SQL_DB_NAME, AppConfig.SQL_DB_USERNAME, AppConfig.SQL_DB_PASSWORD, {
        logging: false,
        host: AppConfig.SQL_DB_HOST,
        port: AppConfig.SQL_DB_PORT,
        dialect: AppConfig.SQL_DIALECT as Dialect,
        timezone: '+05:30',
        pool: {
          max: AppConfig.SQL_MAX_POOL,
          min: AppConfig.SQL_MIN_POOL,
          acquire: Number(AppConfig.SQL_AQUIRE),
          idle: Number(AppConfig.SQL_IDLE),
        },
      });
      console.log(`MySQL connected sucessfully with DB - ${AppConfig.SQL_DB_NAME}`); // eslint-disable-line
    }
  }

  static getMySQLConnection() {
    return { Sequelize, sequelize: this.INSTANCE };
  }
}
