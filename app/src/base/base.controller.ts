import { Response, Request, NextFunction } from 'express';

import { Responses } from '../../enums/responses';

export default class BaseController {
  public service: any;
  public responseParser: any;
  public moduleName: any;

  constructor(Service: any, responseParser: any, moduleName: string = '') {
    this.service = new Service();
    this.responseParser = responseParser;
    this.moduleName = moduleName;
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result = await this.service.create(req.body);
      result = this.responseParser.parse(result);
      return res.status(201).json({ success: true, message: `${this.moduleName} ${Responses.CREATION_SUCCESS}`.trim(), data: result });
    } catch (err) {
      next(err);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = Number((req.params as any).id);
      let result = await this.service.getById(id);
      result = this.responseParser.parse(result);
      return res.status(200).json({ success: true, message: `${this.moduleName} ${Responses.FETCH_SUCCESS}`.trim(), data: result });
    } catch (err) {
      next(err);
    }
  };

  public updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = Number((req.params as any).id);
      let result = await this.service.updateById(id, req.body);
      result = this.responseParser.parse(result);
      return res.status(200).json({ success: true, message: `${this.moduleName} ${Responses.UPDATION_SUCCESS}`.trim(), data: result });
    } catch (err) {
      next(err);
    }
  };

  public deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = Number((req.params as any).id);
      await this.service.deleteById(id);
      return res.status(200).json({ success: true, message: `${this.moduleName} ${Responses.DELETION_SUCCESS}`.trim() });
    } catch (err) {
      next(err);
    }
  };
}
