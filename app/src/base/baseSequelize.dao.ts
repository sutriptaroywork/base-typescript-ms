import { Transaction } from 'sequelize';

export default class BaseSequelizeDao<InputT, OutputT> {
  public model: any;

  constructor(model: any) {
    this.model = model;
  }

  public create = async (input: InputT, t: Transaction | null = null): Promise<OutputT> => {
    const obj = await this.model.create(input, { transaction: t });
    return obj;
  };

  public createMultiple = async (input: InputT[], t: Transaction | null = null): Promise<any> => {
    const obj = await this.model.bulkCreate(input, { transaction: t });
    return obj;
  };

  public getById = async (id: number, paranoid: boolean = true): Promise<OutputT> => {
    if (paranoid) {
      return this.model.findByPk(id);
    } else {
      return this.model.findByPk(id, { paranoid });
    }
  };

  public getAll = async (attributes: object = [], filter: object = {}, sort: { field: string; order: string } | null = null): Promise<any> => {
    const orderArr: Array<Array<string>> = [];
    let where: object = {};
    if (Object.keys(filter).length > 0) {
      where = filter;
    }
    if (sort && sort.field && sort.order) {
      orderArr.push([sort.field, sort.order]);
    }

    if ((Array.isArray(attributes) && attributes.length > 0) || Object.keys(attributes).length > 0) {
      return this.model.findAll({
        attributes,
        where,
        order: orderArr,
      });
    }
    return this.model.findAll({
      where,
      order: orderArr,
    });
  };

  public getAllWithLimitOffset = async (
    attributes: object = [],
    filter: object = {},
    offset = 0,
    limit = 10,
    sort: { field: string; order: string } | null = null,
  ): Promise<any> => {
    const orderArr: Array<Array<string>> = [];
    let where: object = {};
    if (Object.keys(filter).length > 0) {
      where = filter;
    }
    if (sort && sort.field && sort.order) {
      orderArr.push([sort.field, sort.order]);
    }

    if ((Array.isArray(attributes) && attributes.length > 0) || Object.keys(attributes).length > 0) {
      return this.model.findAll({
        attributes,
        where,
        order: orderArr,
        offset: offset,
        limit: limit,
      });
    }

    return this.model.findAll({
      where,
      order: orderArr,
      offset: offset,
      limit: limit,
    });
  };

  public updateById = async (id: number, data: InputT, t: Transaction | null = null): Promise<OutputT> => {
    await this.model.update(data, {
      where: { id },
      transaction: t,
      returning: true,
      plain: true,
    });
    return this.getById(id);
  };

  public deleteById = async (id: number, t: Transaction | null = null): Promise<number> => {
    return this.model.destroy({ where: { id: id }, transaction: t });
  };

  public hardDeleteById = async (id: number, t: Transaction | null = null): Promise<number> => {
    return this.model.destroy({
      where: { id },
      force: true,
      transaction: t,
    });
  };

  public reload = async (data: OutputT) => {
    return (data as any).reload();
  };
}
