import { Redis as RedisClient } from '@/connections/redis/redis';

export default class BaseCacheDao {
  public redisClient: RedisClient;

  constructor(redisClient?: any, options: any = {}) {
    console.log(options);
    if (!redisClient) {
      throw new Error('Redis Client Must Required');
    }
    this.redisClient = redisClient;
  }

  /**
   * String functions
   */

  /**
   * create a Redis string
   * @param {string} key key name
   * @param {value} value value of the key
   * @param {number | Date} expiry number value in miliseconds or Date object
   * @returns {string} OK
   */
  createString = (key: string, value: any, expiry?: number | Date) => {
    if (expiry) {
      if (expiry instanceof Date) {
        return this.redisClient.set(key, value, 'PXAT', expiry.getTime());
      } else if (expiry > 0) {
        return this.redisClient.set(key, value, 'PX', expiry);
      }
    }
    return this.redisClient.set(key, value);
  };

  /**
   * create a Redis string, but dont create if it already exist
   * @param {string} key key name
   * @param {value} value value of the key
   * @param {number | Date} expiry number value in miliseconds or Date object
   * @returns {string} OK
   */
  createStringOnlyIfNotExist = (key: string, value: any, expiry?: number | Date) => {
    if (expiry) {
      if (expiry instanceof Date) {
        return this.redisClient.set(key, value, 'PXAT', expiry.getTime(), 'NX');
      } else if (expiry > 0) {
        return this.redisClient.set(key, value, 'PX', expiry, 'NX');
      }
    }
    return this.redisClient.set(key, value, 'NX');
  };

  /**
   * for creating multiple key values, pass object
   * @param {object} obj
   * @returns {string} OK
   */
  createMultipleString = (obj: object) => {
    return this.redisClient.mset(obj);
  };

  /**
   * for incrementing number value by num
   * @param {string} key
   * @param {number} num number to be incremented
   * @returns {number} final value
   */
  incrementByString = (key: string, num: number) => {
    return this.redisClient.incrby(key, num);
  };

  /**
   * check whether string exist or not
   * @param key
   * @returns {number} 0 if not exist, 1 if exist
   */
  checkStringExist = (key: string) => {
    return this.redisClient.exists(key);
  };

  /**
   * get string
   * @param {string} key string key
   * @returns {string | null}
   */
  getString = (key: string) => {
    return this.redisClient.get(key);
  };

  /**
   * for getting multiple strings
   * @param {string[]} key keys array
   * @returns {(string | null)[]}
   */
  getMultipleString = (...key: string[]) => {
    return this.redisClient.mget(...key);
  };

  /**
   * Hash Functions
   */

  /**
   * for creating and updating hash object
   * @param {string} objectKey hash name
   * @param {object} value
   * @returns {number} number of keys created
   */
  createHash = (objectKey: string, value: object) => {
    return this.redisClient.hset(objectKey, value);
  };

  /**
   * it will increment the numerical value by "value"
   * if key does not exist then it will create it
   * @param {string} objectKey hash name
   * @param {string} key key to be incremented
   * @param {number} value number incremented by
   * @returns {number} final value
   */
  incrementByHash = (objectKey: string, key: string, value: any) => {
    return this.redisClient.hincrby(objectKey, key, value);
  };

  /**
   * for creating key if it does not exist
   * @param {string} objectKey hash name
   * @param {string} key key to be set
   * @param {string | number} value
   * @returns {number} 0/1, 1 if key has been created
   */
  createHashKeyIfNotExist = (objectKey: string, key: string, value: number) => {
    return this.redisClient.hsetnx(objectKey, key, value);
  };

  /**
   *
   * @param {string} objectKey hash name
   * @param {string[]} keys
   * @returns {number} number of keys deleted
   */
  deleteHashKeys = (objectKey: string, ...keys: string[]) => {
    return this.redisClient.hdel(objectKey, ...keys);
  };

  /**
   *
   * @param {string} objectKey hash name
   * @param {string} key
   * @returns {number} 0/1, 1 means key exists
   */
  checkHashKeyExist = (objectKey: string, key: string) => {
    return this.redisClient.hexists(objectKey, key);
  };

  /**
   * get a single key's data
   * @param {string} objectKey hash name
   * @param {string} key key name
   * @returns {string | null}
   */
  getHashKeyValue = (objectKey: string, key: string) => {
    return this.redisClient.hget(objectKey, key);
  };

  /**
   * get all data of a hash
   * @param {string} objectKey hash name
   * @returns
   */
  getAllHash = (objectKey: string) => {
    return this.redisClient.hgetall(objectKey);
  };

  /**
   * get keys of a hash
   * @param {string} objectKey hash name
   * @returns {string[]} array of keys
   */
  getAllKeysHash = (objectKey: string) => {
    return this.redisClient.hkeys(objectKey);
  };

  /**
   * get values of a hash
   * @param {string} objectKey hash name
   * @returns {string[]} array of values
   */
  getAllValuesHash = (objectKey: string) => {
    return this.redisClient.hvals(objectKey);
  };

  /**
   * Set Functions
   */

  /**
   * creating/updating a set
   * @param {string} setKey set name
   * @param {(string | number)[]} members members data
   * @returns {number} numbers of members created
   */
  createSet = (setKey: string, ...members: string[]) => {
    return this.redisClient.sadd(setKey, ...members);
  };

  /**
   * for deleting members form a set
   * @param {string} setKey set name
   * @param {(string | number)[]} members members to be deleted
   * @returns {number} number of members deleted
   */
  deleteSetElement = (setKey: string, ...members: string[]) => {
    return this.redisClient.srem(setKey, ...members);
  };

  /**
   * for fetching length of the set
   * @param {string} setKey set name
   */
  lengthOfSet = (setKey: string) => {
    this.redisClient.scard(setKey);
  };

  /**
   * for getting intersection of sets
   * @param {string[]} setKeys sets name
   * @returns
   */
  intersectionSet = (...setKeys: string[]) => {
    return this.redisClient.sdiff(...setKeys);
  };

  /**
   * for getting union of sets
   * @param {string[]} setKeys sets name
   * @returns
   */
  unionSet = (...setKeys: string[]) => {
    return this.redisClient.sunion(...setKeys);
  };

  /**
   * check member exist in the set or not
   * @param {string} setKey set name
   * @param {string | number} key check member exist
   * @returns {number} 0/1, 1 if member exist
   */
  checkIsMemeberSet = (setKey: string, key: string | number) => {
    return this.redisClient.sismember(setKey, key);
  };

  /**
   * fetching list of members of a set
   * @param {string} setKey set name
   * @returns {string[]} list of members
   */
  getAllSet = (setKey: string) => {
    return this.redisClient.smembers(setKey);
  };

  /**
   * List functions
   */

  /**
   * creating/update a list, left push
   * @param {string} listKey list name
   * @param {(string | number)[]} keys
   * @returns {number} length of the list
   */
  createList = (listKey: string, ...keys: (string | number)[]) => {
    return this.redisClient.lpush(listKey, ...keys);
  };

  /**
   * creating/update a list, right push
   * @param {string} listKey list name
   * @param {(string | number)[]} keys
   * @returns {number} length of the list
   */
  rightPushList = (listKey: string, ...keys: (string | number)[]) => {
    return this.redisClient.rpush(listKey, ...keys);
  };

  /**
   * pop data from the left side, list
   * @param {string} listKey list name listKey
   * @param {number} num optional, number of data to be poped
   * @returns {string[]} array of poped data
   */
  leftPopList = (listKey: string, num?: number) => {
    return this.redisClient.lpop(listKey, num);
  };

  /**
   * pop data from the right side, list
   * @param {string} listKey list name listKey
   * @param {number} num optional, number of data to be poped
   * @returns {string[]} array of poped data
   */
  rightPopList = (listKey: string, num?: number) => {
    return this.redisClient.rpop(listKey, num);
  };

  /**
   * set a value to a specific index
   * @param {string} listKey list name listKey
   * @param {number} index index to be updated
   * @param {string | number} value new value
   * @returns {string} OK
   */
  setValueAtIndexList = (listKey: string, index: number, value: any) => {
    return this.redisClient.lset(listKey, index, value);
  };

  /**
   * trim list to a specific index range
   * @param {string} listKey list name listKey
   * @param {number} start start index
   * @param {number} end end index
   * @returns {stirng} OK
   */
  trimList = (listKey: string, start?: number, end?: number) => {
    start = start || 0;
    end = end || -1;
    return this.redisClient.ltrim(listKey, start, end);
  };

  /**
   * length of the list
   * @param {string} listKey list name listKey
   * @returns {number} length of the list
   */
  lengthOfList = (listKey: string) => {
    return this.redisClient.llen(listKey);
  };

  /**
   * get data of a specific index range
   * @param {string} listKey list name listKey
   * @param {number} start start index
   * @param {number} end end index
   * @returns {string[]} array of list nodes
   */
  getAllList = (listKey: string, start?: number, end?: number) => {
    start = start || 0;
    end = end || -1;
    return this.redisClient.lrange(listKey, start, end);
  };

  /**
   * left index element
   * @param {string} listKey list name listKey
   * @param {number} index left index
   * @returns {string | null}
   */
  getElementAtIndexList = (listKey: string, index: number) => {
    return this.redisClient.lindex(listKey, index);
  };

  /**
   * position of element form left hand side
   * @param {string} listKey list name listKey
   * @param {string | number} key left index
   * @returns {string | null} element index, if there are multiple then it will return first one from left hand side
   */
  getPositionOfElementList = (listKey: string, key: any) => {
    return this.redisClient.lpos(listKey, key);
  };

  /**
   * Sorted Set functions
   */

  /**
   * creating/updating a sorted set, sorted set must have [score, data]
   * @param {string} sortedSetKey sorted set name
   * @param {(string | Buffer | number)[]} scoreMembers array of [score, data]
   * @returns {number} number of keys created
   */
  createSortedSet = (sortedSetKey: string, ...scoreMembers: (string | Buffer | number)[]) => {
    return this.redisClient.zadd(sortedSetKey, ...scoreMembers);
  };

  /**
   * get array of sorted elements
   * @param {string} sortedSetKey sorted set name
   * @param {number} start optional, starting index
   * @param {number} end optional, ending index
   * @returns {string[]} array of sorted(sort by score) elements
   */
  getSortedSet = (sortedSetKey: string, start?: number, end?: number) => {
    start = start || 0;
    end = end || -1;
    return this.redisClient.zrange(sortedSetKey, start, end);
  };

  /**
   * get array of sorted elements in reverse order
   * @param {string} sortedSetKey sorted set name
   * @param {number} start optional, starting index
   * @param {number} end optional, ending index
   * @returns {string[]} array of sorted(sort by score) elements in reverse order
   */
  getReverseSortedSet = (sortedSetKey: string, start?: number, end?: number) => {
    start = start || 0;
    end = end || -1;
    return this.redisClient.zrange(sortedSetKey, start, end, 'REV');
  };

  /**
   * get array of sorted elements with scores
   * @param {string} sortedSetKey sorted set name
   * @param {number} start optional, starting index
   * @param {number} end optional, ending index
   * @returns {string[]} array of sorted(sort by score) elements with scores [element, score]
   */
  getWithScoresSortedSet = (sortedSetKey: string, start?: number, end?: number) => {
    start = start || 0;
    end = end || -1;
    return this.redisClient.zrange(sortedSetKey, start, end, 'WITHSCORES');
  };

  /**
   * get array of sorted elements by scores
   * @param {string} sortedSetKey sorted set name
   * @param {number} start starting score
   * @param {number} end ending score
   * @returns {string[]} array of sorted elements
   */
  getByScoresSortedSet = (sortedSetKey: string, start: number, end: number) => {
    return this.redisClient.zrange(sortedSetKey, start, end, 'BYSCORE');
  };

  /**
   * get array of sorted elements by scores but also including scores
   * @param {string} sortedSetKey sorted set name
   * @param {number} start starting score
   * @param {number} end ending score
   * @returns {string[]} array of sorted elements by scores [element, score]
   */
  getByScoresWithScoresSortedSet = (sortedSetKey: string, start: number, end: number) => {
    return this.redisClient.zrange(sortedSetKey, start, end, 'BYSCORE', 'WITHSCORES');
  };

  /**
   * get length of sorted set
   * @param {string} sortedSetKey sorted set name
   * @returns {number} length of sorted set
   */
  lengthOfSortedSet = (sortedSetKey: string) => {
    return this.redisClient.zcard(sortedSetKey);
  };

  /**
   * Common functions
   */
  /**
   * For sending RAW COMMAND
   * @param {string} command command name
   * @param args
   * @returns
   */

  rawCommand = (command: string, ...args: string[]) => {
    return this.redisClient.call(command, ...args);
  };

  /**
   * type of a key
   * @param {string} key key name
   * @returns {string} type of key
   */
  getTypeOfKey = (key: string) => {
    return this.redisClient.type(key);
  };

  /**
   * for setting expiry
   * @param {string} key
   * @param {number} timeInSeconds
   * @returns {boolean} 0/1, 1 means expiry applied
   */
  setExpiryString = (key: string, timeInSeconds: number) => {
    return this.redisClient.expire(key, timeInSeconds);
  };

  /**
   * expire key at specific date
   * @param {string} key
   * @param {Date} date
   * @returns {boolean} 0/1, 1 means expiry applied
   */
  setExpireAtString = (key: string, date: Date) => {
    return this.redisClient.expire(key, date.getTime());
  };

  /**
   * for removing expiry
   * @param {string} key
   * @returns {boolean} 0/1, 1 means expiry removed
   */
  removeExpiryString = (key: string) => {
    return this.redisClient.persist(key);
  };

  /**
   * TTL, return time to live
   * @param {string} key
   * @returns {number}  -2 if the key does not exist. -1 if the key exists but has no associated expire.
   */
  getTTL = (key: string) => {
    return this.redisClient.ttl(key);
  };

  /**
   * for fetching all keys in redis
   * @returns {string[]} list of keys
   */
  getAllKeys = () => {
    return this.redisClient.keys('*');
  };

  /**
   * for deleting keys
   * @param {string | string[]} keys
   * @returns {number} number of keys deleted
   */
  delete = (...keys: string[]) => {
    return this.redisClient.del(...keys);
  };

  /**
   * delete all data
   * @returns {string} OK
   */
  deleteAll = () => {
    return this.redisClient.flushall();
  };

  // pipelines also exist for chaining multiple queries

  // transaction also exist for having transaction like behaviour
}
