import { Response, Request, NextFunction } from 'express';

import BaseController from '../../base/base.controller';
import LoginLogsService from './loginLogs.service';
import { loginLogsCreationResponseSchema, loginLogsDetailsResponseSchema } from './loginLogs.dto';
import { Responses } from '../../../enums/responses';

export default class LoginLogsController extends BaseController {
  constructor() {
    super(LoginLogsService, loginLogsCreationResponseSchema, 'Login Logs');
  }

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = Number((req.params as any).id);
      let result = await this.service.getById(id);
      result = loginLogsDetailsResponseSchema.parse(result);
      return res.status(200).json({ success: true, message: `${this.moduleName} ${Responses.FETCH_SUCCESS}`.trim(), data: result });
    } catch (err) {
      next(err);
    }
  };
}
