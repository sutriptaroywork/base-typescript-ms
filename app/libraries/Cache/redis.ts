import { redisClient } from '@/connections/redis/redis';

export default class RedisClient {
  constructor() {}
  /**
   * name
   */
  public redisSetKey = (key, value): Promise<any> => {
    return redisClient.set(key, value, 'EX', 60 * 60 * 60);
  };

  public redisGetKey = async (key): Promise<any> => {
    const data = await redisClient.get(key);
    if (!data) return;
    return JSON.parse(data);
  };
}
