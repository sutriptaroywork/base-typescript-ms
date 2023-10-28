// import BaseMysqlDao from '../../base/baseMySQL.dao';
import BaseSequelizeDao from '../../base/baseSequelize.dao';
import UserModel, { UserModelInput, UserModelOutput } from '../../../models/user/user.model';

export default class UserSequelizeDao extends BaseSequelizeDao<UserModelInput, UserModelOutput> {
  constructor() {
    super(UserModel);
  }
}
