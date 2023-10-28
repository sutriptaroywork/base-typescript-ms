import { Router } from 'express';

import validateRequest from '../../middlewares/validation.middleware';

export default class BaseRouter {
  public router: Router;
  public controller: any;
  public createSchema: any;
  public exposeRules: any;

  constructor(Controller: any, exposeRules: any = {}) {
    this.router = Router();
    this.controller = new Controller();
    this.exposeRules = exposeRules;

    this.initializeRoutes();
  }

  initializeRoutes = (): void => {
    if (this.exposeRules.post) {
      this.router
        .route('')
        .post(validateRequest(this.exposeRules.post.validationSchema, this.exposeRules.post.validationKey), this.controller.create);
    }
    if (this.exposeRules.get) {
      this.router
        .route('/:id')
        .get(validateRequest(this.exposeRules.get.validationSchema, this.exposeRules.get.validationKey), this.controller.getById);
    }
    if (this.exposeRules.patch) {
      if (
        Array.isArray(this.exposeRules.patch.validationSchema) &&
        this.exposeRules.patch.validationSchema.length === 2 &&
        Array.isArray(this.exposeRules.patch.validationKey) &&
        this.exposeRules.patch.validationKey.length === 2
      ) {
        this.router
          .route('/:id')
          .patch(
            validateRequest(this.exposeRules.patch.validationSchema[0], this.exposeRules.patch.validationKey[0]),
            validateRequest(this.exposeRules.patch.validationSchema[1], this.exposeRules.patch.validationKey[1]),
            this.controller.updateById,
          );
      } else if (
        Array.isArray(this.exposeRules.patch.validationSchema) &&
        this.exposeRules.patch.validationSchema.length === 1 &&
        Array.isArray(this.exposeRules.patch.validationKey) &&
        this.exposeRules.patch.validationKey.length === 1
      ) {
        this.router
          .route('/:id')
          .patch(validateRequest(this.exposeRules.patch.validationSchema[0], this.exposeRules.patch.validationKey[0]), this.controller.updateById);
      } else {
        this.router
          .route('/:id')
          .patch(validateRequest(this.exposeRules.patch.validationSchema, this.exposeRules.patch.validationKey), this.controller.updateById);
      }
    }
    if (this.exposeRules.delete) {
      this.router
        .route('/:id')
        .delete(validateRequest(this.exposeRules.delete.validationSchema, this.exposeRules.delete.validationKey), this.controller.deleteById);
    }
  };
}
