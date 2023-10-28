import mongoose from 'mongoose';

import { AppConfig } from '../configs/config';

export default class MongoDBConnection {
  private static INSTANCE: any;

  static createMongoDBConnection() {
    if (!this.INSTANCE) {
      this.INSTANCE = mongoose.connect(`${AppConfig.MONGO_DB_URL}/${AppConfig.MONGO_DB_NAME}`).catch((e) => {
        console.log('Mongo Client Creation Error : ', e);
        throw new Error('Error while connecting to MongoDB');
      });
      console.log(`MongoDB connected sucessfully with DB - ${AppConfig.MONGO_DB_NAME}`);
    }
  }

  static getMongoDBConnection() {
    return this.INSTANCE;
  }
}
