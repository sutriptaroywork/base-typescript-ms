import BaseMongoDao from '../../base/baseMongo.dao';
import LoginLogsModel, { LoginLogsModelInput, LoginLogsModelOutput } from '../../../models/logs/loginLogs.model';

export default class LoginLogsDao extends BaseMongoDao<LoginLogsModelInput, LoginLogsModelOutput> {
  constructor() {
    super(LoginLogsModel);
  }
}
