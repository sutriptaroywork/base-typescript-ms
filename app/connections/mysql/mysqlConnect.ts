// import mysql from 'mysql';

// import { AppConfig } from '../../configs/config';

// export default class MySQLConnection {
//   public static CONNECTION: any;

//   constructor() {
//   }

//   static createMySQLConnection() {
//     if (!this.CONNECTION) {
//       this.CONNECTION = mysql.createPool({
//         host            : AppConfig.SQL_DB_HOST,
//         port            : AppConfig.SQL_DB_PORT,
//         user            : AppConfig.SQL_DB_PASSWORD,
//         password        : AppConfig.SQL_DB_PASSWORD,
//         database        : AppConfig.SQL_DB_NAME,
//         connectionLimit : AppConfig.SQL_CONNECTION_LIMIT
//       });
//     }
//     return this.CONNECTION;
//   }
// }
