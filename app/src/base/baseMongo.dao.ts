export default class BaseMongoDao<InputT, OutputT> {
  public model: any;

  constructor(model: any) {
    this.model = model;
  }

  public create = async (input: InputT): Promise<OutputT> => {
    const result = await this.model.create(input);
    return result;
  };

  public findById = async (id: string): Promise<OutputT> => {
    const result = await this.model.findById(id).lean();
    return result;
  };

  public find = async (filter: any): Promise<OutputT> => {
    const result = await this.model.find(filter).lean();
    return result;
  };

  public findWithSelectedFields = async (filter: any, output: any, sorting = {}, skip = 0, limit = 0) => {
    let result;
    if (limit) {
      result = await this.model.find(filter, output).sort(sorting).skip(Number(skip)).limit(Number(limit)).lean();
    } else {
      result = await this.model.find(filter, output).sort(sorting).skip(Number(skip)).lean();
    }
    return result;
  };

  public findOne = async (filter: any): Promise<OutputT> => {
    const result = await this.model.findOne(filter).lean();
    return result;
  };

  public findOneWithFields = async (filter: any, output: any) => {
    const result = await this.model.findOne(filter, output).lean();
    return result;
  };

  public countDocument = async (filter: any) => {
    const result = await this.model.countDocuments(filter);
    return result;
  };

  public findOneAndUpdate = async (filter: any, data: any): Promise<OutputT> => {
    const result = await this.model.findOneAndUpdate(filter, data, { new: true, upsert: true });
    return result;
  };

  public findOneAndUpdateInsert = async (filter: any, data: any) => {
    const result = await this.model.findOneAndUpdate(filter, data, { new: true }).lean();
    return result;
  };

  public updateMany = async (filter: any, update: any) => {
    const result = await this.model.updateMany(filter, update);
    return result;
  };

  public deleteOne = async (filter: any) => {
    const result = await this.model.deleteOne(filter);
    return result;
  };

  // public startMongoTransaction = () : ClientSession =>  {
  //     return db.startTransaction()
  // }

  // public getAllPaginated = (limit : number, offset : number, sort: {field : string, order: string} = null, filter : null): Promise<{ rows: OutputT[]; count: number }> => {
  //     let orderArr: Array<Array<string>> = [];
  // }
}
