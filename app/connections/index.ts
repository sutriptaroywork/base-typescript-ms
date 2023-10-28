import MySQLConnection from './sequelize/mysqlConnector';
import MongoDBConnection from './mongoDB';
import RedisConnection from './redis';

export default class ConnectionsInitiator {
  static initSequelize() {
    MySQLConnection.createMySQLConnection();
    const { Sequelize, sequelize } = MySQLConnection.getMySQLConnection();
    return { Sequelize, sequelize };
  }

  static async initConnections() {
    await MongoDBConnection.createMongoDBConnection();
    await RedisConnection.createRedisConnection();
  }
}
