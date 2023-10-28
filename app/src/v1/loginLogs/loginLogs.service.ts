import BaseMongoService from '../../base/baseMongo.service';
import LoginLogsDao from './loginLogs.dao';
import { LoginLogsModelInput, LoginLogsModelOutput } from '../../../models/logs/loginLogs.model';
import { HttpException } from '../../../libraries/HttpException';
import { HTTPStatus } from '../../../enums/common';
import { Responses } from '../../../enums/responses';

export default class LoginLogsService extends BaseMongoService<LoginLogsModelInput, LoginLogsModelOutput> {
  constructor() {
    super(LoginLogsDao);
  }

  public getById = async (id: number): Promise<LoginLogsModelOutput> => {
    const result: LoginLogsModelOutput = await this.dao.find({ userId: id });
    if (!result) throw new HttpException(HTTPStatus.NOT_FOUND, Responses.NO_DATA_BY_ID);
    return result;
  };
}
