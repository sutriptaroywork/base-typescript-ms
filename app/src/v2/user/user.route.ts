import { Router } from 'express';

import UserController from './user.controller';

export default class UserRouterV2 {
  public router: Router;
  public userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();

    this.initializeRoutes();
  }

  initializeRoutes = (): void => {
    this.router.route('/:id').get(this.userController.getById);
  };
}
