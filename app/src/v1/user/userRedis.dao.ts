import BaseRedisDao from '../../base/baseRedis.dao';

export default class UserRedisDao extends BaseRedisDao {
  constructor() {
    super('USER');
  }
}
