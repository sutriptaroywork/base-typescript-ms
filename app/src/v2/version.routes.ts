import { Router } from 'express';

import UserRouterV2 from './user/user.route';

export default class RouterV2 {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  initializeRoutes = (): void => {
    this.router.use('/user', new UserRouterV2().router);
  };
}
