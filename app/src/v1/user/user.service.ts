import BaseSequelizeService from '../../base/baseSequelize.service';
import UserSequelizeDao from './userSequelize.dao';
import UserRedisDao from './userRedis.dao';
import { UserModelInput, UserModelOutput } from '../../../models/user/user.model';
import { userDetailsResponseSchema } from './user.dto';

export default class UserService extends BaseSequelizeService<UserModelInput, UserModelOutput> {
  constructor() {
    super(UserSequelizeDao, 'USER', UserRedisDao, userDetailsResponseSchema);
  }
}
