import RedisConnection from '../../connections/redis';

import { AppConstants } from '../../configs/constants';

export default class BaseRedisDao {
  private connection: any;
  private moduleName: any;
  private expiry: number | Date;

  constructor(moduleName: string) {
    this.connection = RedisConnection.getRedisConnection();
    this.moduleName = moduleName.toUpperCase();
    this.expiry = AppConstants.MODULE_WITH_CACHE[this.moduleName as keyof object]
      ? AppConstants.MODULE_WITH_CACHE[this.moduleName as keyof object]['EXPIRY']
      : 3600000;
  }

  // ***********        CREATE        ***********//

  create = async (key: string, value: any, expiry: number | Date = this.expiry) => {
    // set key value
    if (expiry instanceof Date) {
      return this.connection.SET(key, value, 'PXAT', expiry.getTime());
    } else {
      return this.connection.SET(key, value, 'PX', expiry);
    }
  };

  createIfNotExist = (key: string, value: any, expiry: number | Date = this.expiry) => {
    // set key value
    if (expiry instanceof Date) {
      return this.connection.SETNX(key, value, 'PXAT', expiry.getTime());
    } else {
      return this.connection.SETNX(key, value, 'PX', expiry);
    }
  };

  createWithHash = async (hash: string, key: string, value: any, expiry: number | Date = this.expiry) => {
    // hset key field value
    if (expiry instanceof Date) {
      return this.connection.HSET(hash, key, value, 'PXAT', expiry.getTime());
    } else {
      return this.connection.HSET(hash, key, value, 'PX', expiry);
    }
  };

  createWithHashIfNotExist = (hash: string, key: string, value: any, expiry: number | Date = this.expiry) => {
    // hset key field value
    if (expiry instanceof Date) {
      return this.connection.HSETNX(hash, key, value, 'PXAT', expiry.getTime());
    } else {
      return this.connection.HSETNX(hash, key, value, 'PX', expiry);
    }
  };

  createSetElement = (setName: string, element: string) => {
    return this.connection.SADD(setName, element);
  };

  createSetWithIntersectionOfSets = (...setKeys: string[]) => {
    return this.connection.SDIFFSTORE(...setKeys);
  };

  createSetWithUnionOfSets = (...setKeys: string[]) => {
    return this.connection.SUNIONSTORE(...setKeys);
  };

  setExpiry = (key: string, timeInSeconds: number) => {
    return this.connection.EXPIRE(key, timeInSeconds);
  };

  setExpireAt = (key: string, date: Date) => {
    return this.connection.EXPIRE(key, date.getTime());
  };

  createListByPushingFirst = (listName: string, ...keys: (string | number)[]) => {
    return this.connection.LPUSH(listName, ...keys);
  };

  createListByPushingLast = (listName: string, ...keys: (string | number)[]) => {
    return this.connection.RPUSH(listName, ...keys);
  };

  setValueAtIndexInList = (listName: string, index: number, value: any) => {
    return this.connection.LSET(listName, index, value);
  };

  createSortedSet = (sortedSetName: string, ...scoreMembers: (string | Buffer | number)[]) => {
    return this.connection.ZADD(sortedSetName, ...scoreMembers);
  };

  // ***********        CHECK        ***********//

  checkIfKeyExists = (key: string) => {
    return this.connection.EXISTS(key);
  };

  checkWithHashIfExists = (hash: string, key: string) => {
    return this.connection.HEXISTS(hash, key);
  };

  checkIsMemeberExistsInSet = (setName: string, element: string | number) => {
    return this.connection.SISMEMBER(setName, element);
  };

  // ***********        GET        ***********//

  get = async (key: string) => {
    // get key
    return this.connection.GET(key);
  };

  getWithHash = async (hash: string, key: string) => {
    // hget key field
    return this.connection.HGET(hash, key);
  };

  getAllKeysByPattern = (pattern: string) => {
    return this.connection.KEYS(pattern);
  };

  getAllKeysInHash = (hash: string) => {
    return this.connection.HKEYS(hash);
  };

  getAllValuesInHash = (hash: string) => {
    return this.connection.HVALS(hash);
  };

  getAllKeysAndValuesInHash = (hash: string) => {
    return this.connection.HGETALL(hash);
  };

  getSetMembers = (setName: string) => {
    return this.connection.SMEMBERS(setName);
  };

  getLengthOfSet = (setName: string) => {
    return this.connection.SCARD(setName);
  };

  getIntersectionOfSets = (...setKeys: string[]) => {
    return this.connection.SDIFF(...setKeys);
  };

  getUnionOfSets = (...setKeys: string[]) => {
    return this.connection.SUNION(...setKeys);
  };

  getTTL = (key: string) => {
    return this.connection.TTL(key);
  };

  getLengthOfList = (listName: string) => {
    return this.connection.LLEN(listName);
  };

  getListItems = (listName: string, start: number, end: number) => {
    return this.connection.LRANGE(listName, start, end);
  };

  getElementAtIndexInList = (listName: string, index: number) => {
    return this.connection.LINDEX(listName, index);
  };

  getPositionOfElementInList = (listName: string, key: any) => {
    // returns the index in the list matching the key
    // Example :-
    // RPUSH mylist a b c 1 2 3 c c c
    // LPOS mylist c ---> 2
    return this.connection.LPOS(listName, key);
  };

  getPositionOfElementInListWithCount = (listName: string, key: any, count: number) => {
    // it will return multiple keys as per the count if found
    // Example :-
    // RPUSH mylist a b c 1 2 3 c c c
    // LPOS mylist c COUNT 2 ---> [2, 6]
    // Here returning the index list of first 2 elements matching from the left. Why 2 elements ? because we pass "COUNT 2".
    // Note : "COUNT 0" returns all the matches.
    return this.connection.LPOS(listName, key).count(count);
  };

  getPositionOfElementInListWithRank = (listName: string, key: any, rank: number) => {
    // rank returns the index of nth positioned element matching the key
    // Example :-
    // RPUSH mylist a b c 1 2 3 c c c
    // LPOS mylist c RANK 2 ---> 6
    // Here we are getting the index of the key i.e. "c" which have a rank 2 i.e. second element from the left.
    // LPOS mylist c RANK -2 ---> 7
    // Here we are getting the index of the key i.e. "c" which have a rank 2 i.e. second element from the right. minus sign starts counting from end.
    return this.connection.LPOS(listName, key).rank(rank);
  };

  getPositionOfElementInListWithCountAndRank = (listName: string, key: any, count: number, rank: number) => {
    // rank returns all the indexes starting from nth positioned element matching the key
    // Example :-
    // RPUSH mylist a b c 1 2 3 c c c
    // LPOS mylist c RANK -2 COUNT 2 ---> [7,6]
    // Here we are getting 2 elements starts from the second element from the end. 2 elements because of "COUNT 2", starts from the second element from the end because we pass "RANK -2".
    // If we pass "RANK 2 COUNT 2", it will return [6,7]. 2 elements from the starting point of the list.
    return this.connection.LPOS(listName, key).count(count).rank(rank);
  };

  getSortedSet = (sortedSetName: string, start: number, end: number, withScores: boolean = false) => {
    if (withScores) {
      // return this.connection.ZRANGE(sortedSetName, start, end).WITHSCORES();
      return this.connection.ZRANGE(sortedSetName, start, end, 'WITHSCORES');
    }
    return this.connection.ZRANGE(sortedSetName, start, end);
  };

  getSortedSetReversed = (sortedSetName: string, start: number, end: number) => {
    // return this.connection.ZRANGE(sortedSetName, start, end).REV();
    return this.connection.ZRANGE(sortedSetName, start, end, 'REV');
  };

  getLengthOfSortedSet = (sortedSetName: string) => {
    return this.connection.ZCARD(sortedSetName);
  };

  // ***********        INCREASE        ***********//

  increase = async (key: string) => {
    // SET mykey "10"
    // INCR mykey
    // GET mykey
    return this.connection.INCR(key);
  };

  increaseByInteger = (key: string, num: number) => {
    return this.connection.INCRBY(key, num);
  };

  increaseByFloat = (key: string, num: number) => {
    return this.connection.INCRBYFLOAT(key, num);
  };

  increaseWithHashByInteger = (hash: string, key: string, value: any) => {
    return this.connection.HINCRBY(hash, key, value);
  };

  increaseWithHashByFloat = (hash: string, key: string, value: any) => {
    return this.connection.HINCRBYFLOAT(hash, key, value);
  };

  // ***********        DELETE        ***********//

  delete = async (key: string) => {
    // HSETNX myhash field "Hello"
    // HGET myhash field
    return this.connection.DEL(key);
  };

  deleteWithHash = async (hash: string, key: string) => {
    // HSETNX myhash field "Hello"
    // HGET myhash field
    return this.connection.HDEL(hash, key);
  };

  deleteSetElement = (setName: string, element: string) => {
    return this.connection.SREM(setName, element);
  };

  deletingListElementsFromFirst = (listName: string, num?: number) => {
    if (num) {
      return this.connection.LPOP(listName, num);
    }
    return this.connection.LPOP(listName);
  };

  deletingListElementsFromLast = (listName: string, num?: number) => {
    if (num) {
      return this.connection.RPOP(listName, num);
    }
    return this.connection.RPOP(listName);
  };

  trimList = (listName: string, start: number, end: number) => {
    return this.connection.LTRIM(listName, start, end);
  };
}

// import { Redis as RedisClient } from '@/connections/redis/redis';

// export default class BaseCacheDao {
//   public redisClient: RedisClient

//   constructor(redisClient?: any, options: any = {}) {
//     if (!redisClient) { throw new Error("Redis Client Must Required") }
//     this.redisClient = redisClient;
//   }

//   /**
//    * String functions
//    */

//   /**
//    * create a Redis string
//    * @param {string} key key name
//    * @param {value} value value of the key
//    * @param {number | Date} expiry number value in miliseconds or Date object
//    * @returns {string} OK
//    */
//   createString = (key: string, value: any, expiry?: number | Date) => {
//     if (expiry) {
//       if (expiry instanceof Date) {
//         return this.redisClient.set(key, value, 'PXAT', expiry.getTime());
//       }
//       else if (expiry > 0) {
//         return this.redisClient.set(key, value, 'PX', expiry);
//       }
//     }
//     return this.redisClient.set(key, value);
//   }

//   /**
//    * create a Redis string, but dont create if it already exist
//    * @param {string} key key name
//    * @param {value} value value of the key
//    * @param {number | Date} expiry number value in miliseconds or Date object
//    * @returns {string} OK
//    */
//   createStringOnlyIfNotExist = (key: string, value: any, expiry?: number | Date) => {
//     if (expiry) {
//       if (expiry instanceof Date) {
//         return this.redisClient.set(key, value, 'PXAT', expiry.getTime(), 'NX');
//       }
//       else if (expiry > 0) {
//         return this.redisClient.set(key, value, 'PX', expiry, 'NX');
//       }
//     }
//     return this.redisClient.set(key, value, 'NX');
//   }

//   /**
//    * for creating multiple key values, pass object
//    * @param {object} obj
//    * @returns {string} OK
//    */
//   createMultipleString = (obj: object) => {
//     return this.redisClient.mset(obj);
//   }

//   /**
//    * for incrementing number value by num
//    * @param {string} key
//    * @param {number} num number to be incremented
//    * @returns {number} final value
//    */
//   incrementByString = (key: string, num: number) => {
//     return this.redisClient.incrby(key, num);
//   }

//   /**
//    * check whether string exist or not
//    * @param key
//    * @returns {number} 0 if not exist, 1 if exist
//    */
//   checkStringExist = (key: string) => {
//     return this.redisClient.exists(key);
//   }

//   /**
//    * get string
//    * @param {string} key string key
//    * @returns {string | null}
//    */
//   getString = (key: string) => {
//     return this.redisClient.get(key);
//   }

//   /**
//    * for getting multiple strings
//    * @param {string[]} key keys array
//    * @returns {(string | null)[]}
//    */
//   getMultipleString = (...key: string[]) => {
//     return this.redisClient.mget(...key);
//   }

//   /**
//    * Hash Functions
//    */

//   /**
//    * for creating and updating hash object
//    * @param {string} objectKey hash name
//    * @param {object} value
//    * @returns {number} number of keys created
//    */
//   createHash = (objectKey: string, value: object) => {
//     return this.redisClient.hset(objectKey, value);
//   }

//   /**
//    * it will increment the numerical value by "value"
//    * if key does not exist then it will create it
//    * @param {string} objectKey hash name
//    * @param {string} key key to be incremented
//    * @param {number} value number incremented by
//    * @returns {number} final value
//    */
//   incrementByHash = (objectKey: string, key: string, value: any) => {
//     return this.redisClient.hincrby(objectKey, key, value);
//   }

//   /**
//    * for creating key if it does not exist
//    * @param {string} objectKey hash name
//    * @param {string} key key to be set
//    * @param {string | number} value
//    * @returns {number} 0/1, 1 if key has been created
//    */
//   createHashKeyIfNotExist = (objectKey: string, key: string, value: number) => {
//     return this.redisClient.hsetnx(objectKey, key, value);
//   }

//   /**
//    *
//    * @param {string} objectKey hash name
//    * @param {string[]} keys
//    * @returns {number} number of keys deleted
//    */
//   deleteHashKeys = (objectKey: string, ...keys: string[]) => {
//     return this.redisClient.hdel(objectKey, ...keys)
//   }

//   /**
//    *
//    * @param {string} objectKey hash name
//    * @param {string} key
//    * @returns {number} 0/1, 1 means key exists
//    */
//   checkHashKeyExist = (objectKey: string, key: string) => {
//     return this.redisClient.hexists(objectKey, key);
//   }

//   /**
//    * get a single key's data
//    * @param {string} objectKey hash name
//    * @param {string} key key name
//    * @returns {string | null}
//    */
//   getHashKeyValue = (objectKey: string, key: string) => {
//     return this.redisClient.hget(objectKey, key);
//   }

//   /**
//    * get all data of a hash
//    * @param {string} objectKey hash name
//    * @returns
//    */
//   getAllHash = (objectKey: string) => {
//     return this.redisClient.hgetall(objectKey);
//   }

//   /**
//    * get keys of a hash
//    * @param {string} objectKey hash name
//    * @returns {string[]} array of keys
//    */
//   getAllKeysHash = (objectKey: string) => {
//     return this.redisClient.hkeys(objectKey);
//   }

//   /**
//    * get values of a hash
//    * @param {string} objectKey hash name
//    * @returns {string[]} array of values
//    */
//   getAllValuesHash = (objectKey: string) => {
//     return this.redisClient.hvals(objectKey);
//   }

//   /**
//    * Set Functions
//    */

//   /**
//    * creating/updating a set
//    * @param {string} setKey set name
//    * @param {(string | number)[]} members members data
//    * @returns {number} numbers of members created
//    */
//   createSet = (setKey: string, ...members: string[]) => {
//     return this.redisClient.sadd(setKey, ...members);
//   }

//   /**
//    * for deleting members form a set
//    * @param {string} setKey set name
//    * @param {(string | number)[]} members members to be deleted
//    * @returns {number} number of members deleted
//    */
//   deleteSetElement = (setKey: string, ...members: string[]) => {
//     return this.redisClient.srem(setKey, ...members);
//   }

//   /**
//    * for fetching length of the set
//    * @param {string} setKey set name
//    */
//   lengthOfSet = (setKey: string) => {
//     this.redisClient.scard(setKey);
//   }

//   /**
//    * for getting intersection of sets
//    * @param {string[]} setKeys sets name
//    * @returns
//    */
//   intersectionSet = (...setKeys: string[]) => {
//     return this.redisClient.sdiff(...setKeys);
//   }

//   /**
//    * for getting union of sets
//    * @param {string[]} setKeys sets name
//    * @returns
//    */
//   unionSet = (...setKeys: string[]) => {
//     return this.redisClient.sunion(...setKeys);
//   }

//   /**
//    * check member exist in the set or not
//    * @param {string} setKey set name
//    * @param {string | number} key check member exist
//    * @returns {number} 0/1, 1 if member exist
//    */
//   checkIsMemeberSet = (setKey: string, key: string | number) => {
//     return this.redisClient.sismember(setKey, key);
//   }

//   /**
//    * fetching list of members of a set
//    * @param {string} setKey set name
//    * @returns {string[]} list of members
//    */
//   getAllSet = (setKey: string) => {
//     return this.redisClient.smembers(setKey);
//   }

//   /**
//    * List functions
//    */

//   /**
//    * creating/update a list, left push
//    * @param {string} listKey list name
//    * @param {(string | number)[]} keys
//    * @returns {number} length of the list
//    */
//   createList = (listKey: string, ...keys: (string | number)[]) => {
//     return this.redisClient.lpush(listKey, ...keys);
//   }

//   /**
//    * creating/update a list, right push
//    * @param {string} listKey list name
//    * @param {(string | number)[]} keys
//    * @returns {number} length of the list
//    */
//   rightPushList = (listKey: string, ...keys: (string | number)[]) => {
//     return this.redisClient.rpush(listKey, ...keys);
//   }

//   /**
//    * pop data from the left side, list
//    * @param {string} listKey list name listKey
//    * @param {number} num optional, number of data to be poped
//    * @returns {string[]} array of poped data
//    */
//   leftPopList = (listKey: string, num?: number) => {
//     return this.redisClient.lpop(listKey, num);
//   }

//   /**
//    * pop data from the right side, list
//    * @param {string} listKey list name listKey
//    * @param {number} num optional, number of data to be poped
//    * @returns {string[]} array of poped data
//    */
//   rightPopList = (listKey: string, num?: number) => {
//     return this.redisClient.rpop(listKey, num);
//   }

//   /**
//    * set a value to a specific index
//    * @param {string} listKey list name listKey
//    * @param {number} index index to be updated
//    * @param {string | number} value new value
//    * @returns {string} OK
//    */
//   setValueAtIndexList = (listKey: string, index: number, value: any) => {
//     return this.redisClient.lset(listKey, index, value);
//   }

//   /**
//    * trim list to a specific index range
//    * @param {string} listKey list name listKey
//    * @param {number} start start index
//    * @param {number} end end index
//    * @returns {stirng} OK
//    */
//   trimList = (listKey: string, start?: number, end?: number) => {
//     start = start || 0;
//     end = end || -1;
//     return this.redisClient.ltrim(listKey, start, end);
//   }

//   /**
//    * length of the list
//    * @param {string} listKey list name listKey
//    * @returns {number} length of the list
//    */
//   lengthOfList = (listKey: string) => {
//     return this.redisClient.llen(listKey);
//   }

//   /**
//    * get data of a specific index range
//    * @param {string} listKey list name listKey
//    * @param {number} start start index
//    * @param {number} end end index
//    * @returns {string[]} array of list nodes
//    */
//   getAllList = (listKey: string, start?: number, end?: number) => {
//     start = start || 0;
//     end = end || -1;
//     return this.redisClient.lrange(listKey, start, end);
//   }

//   /**
//    * left index element
//    * @param {string} listKey list name listKey
//    * @param {number} index left index
//    * @returns {string | null}
//    */
//   getElementAtIndexList = (listKey: string, index: number) => {
//     return this.redisClient.lindex(listKey, index);
//   }

//   /**
//    * position of element form left hand side
//    * @param {string} listKey list name listKey
//    * @param {string | number} key left index
//    * @returns {string | null} element index, if there are multiple then it will return first one from left hand side
//    */
//   getPositionOfElementList = (listKey: string, key: any) => {
//     return this.redisClient.lpos(listKey, key);
//   }

//   /**
//    * Sorted Set functions
//    */

//   /**
//    * creating/updating a sorted set, sorted set must have [score, data]
//    * @param {string} sortedSetKey sorted set name
//    * @param {(string | Buffer | number)[]} scoreMembers array of [score, data]
//    * @returns {number} number of keys created
//    */
//   createSortedSet = (sortedSetKey: string, ...scoreMembers: (string | Buffer | number)[]) => {
//     return this.redisClient.zadd(sortedSetKey, ...scoreMembers);
//   }

//   /**
//    * get array of sorted elements
//    * @param {string} sortedSetKey sorted set name
//    * @param {number} start optional, starting index
//    * @param {number} end optional, ending index
//    * @returns {string[]} array of sorted(sort by score) elements
//    */
//   getSortedSet = (sortedSetKey: string, start?: number, end?: number) => {
//     start = start || 0;
//     end = end || -1;
//     return this.redisClient.zrange(sortedSetKey, start, end);
//   }

//   /**
//    * get array of sorted elements in reverse order
//    * @param {string} sortedSetKey sorted set name
//    * @param {number} start optional, starting index
//    * @param {number} end optional, ending index
//    * @returns {string[]} array of sorted(sort by score) elements in reverse order
//    */
//   getReverseSortedSet = (sortedSetKey: string, start?: number, end?: number) => {
//     start = start || 0;
//     end = end || -1;
//     return this.redisClient.zrange(sortedSetKey, start, end, 'REV');
//   }

//   /**
//    * get array of sorted elements with scores
//    * @param {string} sortedSetKey sorted set name
//    * @param {number} start optional, starting index
//    * @param {number} end optional, ending index
//    * @returns {string[]} array of sorted(sort by score) elements with scores [element, score]
//    */
//   getWithScoresSortedSet = (sortedSetKey: string, start?: number, end?: number) => {
//     start = start || 0;
//     end = end || -1;
//     return this.redisClient.zrange(sortedSetKey, start, end, 'WITHSCORES');
//   }

//   /**
//    * get array of sorted elements by scores
//    * @param {string} sortedSetKey sorted set name
//    * @param {number} start starting score
//    * @param {number} end ending score
//    * @returns {string[]} array of sorted elements
//    */
//   getByScoresSortedSet = (sortedSetKey: string, start: number, end: number) => {
//     return this.redisClient.zrange(sortedSetKey, start, end, 'BYSCORE');
//   }

//   /**
//    * get array of sorted elements by scores but also including scores
//    * @param {string} sortedSetKey sorted set name
//    * @param {number} start starting score
//    * @param {number} end ending score
//    * @returns {string[]} array of sorted elements by scores [element, score]
//    */
//   getByScoresWithScoresSortedSet = (sortedSetKey: string, start: number, end: number) => {
//     return this.redisClient.zrange(sortedSetKey, start, end, 'BYSCORE', 'WITHSCORES');
//   }

//   /**
//    * get length of sorted set
//    * @param {string} sortedSetKey sorted set name
//    * @returns {number} length of sorted set
//    */
//   lengthOfSortedSet = (sortedSetKey: string) => {
//     return this.redisClient.zcard(sortedSetKey);
//   }

//   /**
//    * Common functions
//    */
//   /**
//    * For sending RAW COMMAND
//    * @param {string} command command name
//    * @param args
//    * @returns
//    */

//   rawCommand = (command: string, ...args: string[]) => {
//     return this.redisClient.call(command, ...args);
//   }

//   /**
//    * type of a key
//    * @param {string} key key name
//    * @returns {string} type of key
//    */
//   getTypeOfKey = (key: string) => {
//     return this.redisClient.type(key);
//   }

//   /**
//    * for setting expiry
//    * @param {string} key
//    * @param {number} timeInSeconds
//    * @returns {boolean} 0/1, 1 means expiry applied
//    */
//   setExpiryString = (key: string, timeInSeconds: number) => {
//     return this.redisClient.expire(key, timeInSeconds);
//   }

//   /**
//    * expire key at specific date
//    * @param {string} key
//    * @param {Date} date
//    * @returns {boolean} 0/1, 1 means expiry applied
//    */
//   setExpireAtString = (key: string, date: Date) => {
//     return this.redisClient.expire(key, date.getTime());
//   }

//   /**
//    * for removing expiry
//    * @param {string} key
//    * @returns {boolean} 0/1, 1 means expiry removed
//    */
//   removeExpiryString = (key: string) => {
//     return this.redisClient.persist(key);
//   }

//   /**
//    * TTL, return time to live
//    * @param {string} key
//    * @returns {number}  -2 if the key does not exist. -1 if the key exists but has no associated expire.
//    */
//   getTTL = (key: string) => {
//     return this.redisClient.ttl(key);
//   }

//   /**
//    * for fetching all keys in redis
//    * @returns {string[]} list of keys
//    */
//   getAllKeys = () => {
//     return this.redisClient.keys('*');
//   }

//   /**
//    * for deleting keys
//    * @param {string | string[]} keys
//    * @returns {number} number of keys deleted
//    */
//   delete = (...keys: string[]) => {
//     return this.redisClient.del(...keys);
//   }

//   /**
//    * delete all data
//    * @returns {string} OK
//    */
//   deleteAll = () => {
//     return this.redisClient.flushall();
//   }

//   // pipelines also exist for chaining multiple queries

//   // transaction also exist for having transaction like behaviour
// }
