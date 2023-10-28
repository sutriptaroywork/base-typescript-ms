import * as Sentry from '@sentry/node';

export default class SentryConnection {
  private static INSTANCE: any;

  constructor() {
    Sentry.init({
      dsn: 'https://9dbfec8c1794f83565c15a933e1edcb9@o4505996252610560.ingest.sentry.io/4505996262244352',
      // Performance Monitoring
      tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    });
  }

  static createSentryConnection() {
    if (!this.INSTANCE) {
      this.INSTANCE = new SentryConnection();
    }
    return Sentry;
  }
}
