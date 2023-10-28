export enum HTTPStatus {
  OK = 200,
  CREATE = 201,
  DELETED = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  NOT_ACCEPTABLE = 406,
  EXCEPTION_FAILED = 417,
  LOCKED = 423,
  INTERNAL_SERVER_ERROR = 500,
  UNPROCESSABLE_ENTITY = 422,
  RESOURCE_EXIST = 409,
  TOO_MANY_REQUEST = 429,
}

export enum UserStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  BLOCKED = 'blocked',
  REJECTED = 'rejected',
  CLOSED = 'closed',
}

export enum LoginStatus {
  SUCCESSFUL = 'successful',
  FAILED = 'failed',
}
