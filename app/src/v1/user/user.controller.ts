import { Response, Request, NextFunction } from 'express';

import BaseController from '../../base/base.controller';
// import { BaseController } from '@sutriptaroy/base-package';
import UserService from './user.service';
import { userDetailsResponseSchema } from './user.dto';

export default class UserController extends BaseController {
  constructor() {
    super(UserService, userDetailsResponseSchema, 'User');
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ success: true, data: 'result from v1 login' });
    } catch (err) {
      next(err);
    }
  };

  public registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ success: true, data: 'result from v1 registration' });
    } catch (err) {
      next(err);
    }
  };
}
