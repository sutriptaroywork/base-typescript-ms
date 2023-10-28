export class AppConstants {
  static readonly USER_STATUS = ['active', 'pending', 'blocked', 'rejected', 'closed'];
  static readonly LOGIN_STATUS = ['successful', 'unsuccessful'];
  static readonly MODULE_WITH_CACHE = {
    USER: {
      EXPIRY: 3600000,
    },
  };
}
