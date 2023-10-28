import LoginLogsController from './loginLogs.controller';
import BaseRouter from '../../base/base.routes';
import { createSchema, identitySchema } from './loginLogs.dto';

export default class LoginLogsRouterV1 extends BaseRouter {
  constructor() {
    super(LoginLogsController, {
      post: {
        validationSchema: createSchema,
        validationKey: 'body',
      },
      get: {
        validationSchema: identitySchema,
        validationKey: 'params',
      },
    });
  }
}
