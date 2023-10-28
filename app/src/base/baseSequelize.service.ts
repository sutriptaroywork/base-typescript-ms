import { HttpException } from '../../libraries/HttpException';
import { HTTPStatus } from '../../enums/common';
import { Responses } from '../../enums/responses';
import { AppConstants } from '../../configs/constants';

export default class BaseSequelizeService<AttributesInputT, AttributesOutputT> {
  public sequelizeDao: any;
  public moduleName: any;
  public cacheEnabled: boolean = false;
  public redisDao: any;
  public redisStoreSchema: any;

  constructor(SequelizeDao: any, moduleName: string, RedisDao: any | null = null, redisStoreSchema: any) {
    this.sequelizeDao = new SequelizeDao();
    this.moduleName = moduleName;
    this.cacheEnabled = AppConstants.MODULE_WITH_CACHE[this.moduleName.toUpperCase() as keyof object] ? true : false;

    if (this.cacheEnabled) {
      this.redisDao = new RedisDao();
      this.redisStoreSchema = redisStoreSchema;
    }
  }

  public create = async (payload: AttributesInputT): Promise<AttributesOutputT> => {
    const result: AttributesOutputT = await this.sequelizeDao.create(payload);
    if (this.cacheEnabled) {
      this.createCacheWithRedis(result);
    }
    return result;
  };

  public getById = async (id: number, useCache: boolean = true): Promise<AttributesOutputT> => {
    if (this.cacheEnabled && useCache) {
      const result = await this.getCacheWithRedis(id);
      if (result) {
        return JSON.parse(result);
      }
    }
    const result: AttributesOutputT = await this.sequelizeDao.getById(id);
    if (!result) throw new HttpException(HTTPStatus.NOT_FOUND, Responses.NO_DATA_BY_ID);
    if (this.cacheEnabled && useCache) {
      this.createCacheWithRedis(result);
    }
    return result;
  };

  public updateById = async (id: number, payload: any): Promise<AttributesOutputT> => {
    delete payload['id'];
    const result = await this.getById(id, false);
    if (!result) throw new HttpException(HTTPStatus.NOT_FOUND, Responses.NO_DATA_BY_ID);

    const updatedResult = await this.sequelizeDao.updateById(id, payload);
    if (this.cacheEnabled) {
      this.createCacheWithRedis(updatedResult);
    }
    return updatedResult;
  };

  public deleteById = async (id: number): Promise<number> => {
    const result = await this.sequelizeDao.getById(id, false);
    if (!result) throw new HttpException(HTTPStatus.NOT_FOUND, Responses.NO_DATA_BY_ID);
    const deleted = await this.sequelizeDao.deleteById(id);
    if (this.cacheEnabled) {
      this.deleteCacheWithRedis(id);
    }
    return deleted;
  };

  private createCacheWithRedis = (result: any) => {
    result = this.redisStoreSchema.parse(result);
    this.redisDao.createWithHash(this.moduleName, `id-${result.id.toString()}`, JSON.stringify(result));
  };

  private getCacheWithRedis = (id: number) => {
    return this.redisDao.getWithHash(this.moduleName, `id-${id.toString()}`);
  };

  private deleteCacheWithRedis = (id: number) => {
    this.redisDao.deleteWithHash(this.moduleName, `id-${id.toString()}`);
  };
}
