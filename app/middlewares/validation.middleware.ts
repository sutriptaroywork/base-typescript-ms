import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

import { HTTPStatus } from '../enums/common';

const validateRequest =
  (schema: ZodSchema, value: string | 'body' | 'query' | 'params' = 'body') =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[value as keyof Request]);
      next();
    } catch (e: any) {
      const errorMessages: any = [];
      e.errors.map((err: any) => {
        errorMessages.push(err.message);
      });
      return res.status(HTTPStatus.BAD_REQUEST).json({ success: false, error: errorMessages });
    }
  };

export default validateRequest;
