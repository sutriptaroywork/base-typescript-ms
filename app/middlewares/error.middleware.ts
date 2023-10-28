import { NextFunction, Request, Response } from 'express';

import { HttpException } from '../libraries/HttpException';
import { Responses } from '../enums/responses';
import { HTTPStatus } from '../enums/common';
import SentryConnection from '../connections/sentry';
// import logger from '@logging/winstonLogger';

const HandleHTTPErrors = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    try {
      const status: number = err.status || HTTPStatus.INTERNAL_SERVER_ERROR;
      const error: string = err.message || Responses.SOMETHING_WENT_WRONG;
      // logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${error}`);
      return res.status(status).json({ success: false, message: Responses.SOMETHING_WENT_WRONG, error: error });
    } catch (error) {
      next(error);
    }
  } else {
    next(err);
  }
};

const HandleGeneralErrors = (err: any, _req: any, res: Response, _next: NextFunction) => {
  console.log(_next);
  console.log(err);
  if (process.env.NODE_ENV === 'production') {
    // sentry
    const Sentry = SentryConnection.createSentryConnection();
    Sentry.captureMessage(err);
  }
  return res.status(500).send({ success: false, message: Responses.SOMETHING_WENT_WRONG, error: Responses.INTERNAL_SERVER_ERROR });
};

export { HandleHTTPErrors, HandleGeneralErrors };
