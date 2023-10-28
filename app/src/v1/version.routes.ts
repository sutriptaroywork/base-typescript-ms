import { Router } from 'express';

import UserRouterV1 from './user/user.route';
import LoginLogsRouterV1 from './loginLogs/loginLogs.route';

export default class RouterV1 {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  initializeRoutes = (): void => {
    this.router.use('/user', new UserRouterV1().router);
    this.router.use('/loginlogs', new LoginLogsRouterV1().router);
  };
}
