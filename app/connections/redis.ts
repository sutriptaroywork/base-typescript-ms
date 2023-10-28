import { createClient } from 'redis';

import { AppConfig } from '../configs/config';

export default class RedisConnection {
  private static INSTANCE: any;

  static async createRedisConnection() {
    // username: default ---> as we are using "default" as username, it works; if we don't pass.
    if (!this.INSTANCE) {
      this.INSTANCE = await createClient({
        password: AppConfig.REDIS_PASSWORD,
        socket: {
          host: AppConfig.REDIS_URL,
          port: AppConfig.REDIS_PORT,
        },
      })
        .on('error', (err) => {
          console.log('Redis Client Creation Error : ', err);
          throw new Error('Error while connecting to Redis');
        })
        .connect();
    }
    console.log('Redis Connected');
  }

  static getRedisConnection() {
    return this.INSTANCE;
  }
}
