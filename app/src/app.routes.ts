import { Router } from 'express';

import RouterV1 from './v1/version.routes';
import RouterV2 from './v2/version.routes';

export default class AppRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }
  initializeRoutes = (): void => {
    this.router.use('/v1', new RouterV1().router);
    this.router.use('/v2', new RouterV2().router);
  };
}
