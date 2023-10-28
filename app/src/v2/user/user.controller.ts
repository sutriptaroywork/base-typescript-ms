import { Response, Request, NextFunction } from 'express';

export default class UserController {
  constructor() {}

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ success: true, data: 'result from v2' });
    } catch (err) {
      next(err);
    }
  };
}
