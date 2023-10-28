// import MySQLConnection from './mysqlConnect';
// import { AppConfig } from '../../configs/config';

// export default class MySQLQueryExecuter {
//   private connection: any;

//   constructor() {
//     this.connection = MySQLConnection.createMySQLConnection();
//   }

//   private getMySQLConnection() {
//     return new Promise((resolve, reject) => {
//       this.connection.getConnection((err: any, conn: any) => {
//         if (err) {
//           reject(err)
//         } else {
//           resolve(conn);
//         }
//       });
//     })
//   }

//   private closeMySQLConnection() {
//     return new Promise((resolve, reject) => {
//       this.connection.getConnection((err: any, conn: any) => {
//         if (err) {
//           reject(err)
//         } else {
//           conn.release();
//           resolve(1);
//         }
//       });
//     })
//   }

//   private isSelectQuery(sql: string) {
//     return sql.trim().toUpperCase().startsWith('SELECT');
//   }

//   query(sql: string, args: any, timeout = AppConfig.SQL_MAX_TIMEOUT) {
//     if (this.isSelectQuery(sql)) {
//       sql = sql.replace(/SELECT/i, `SELECT /*+ MAX_EXECUTION_TIME(${timeout}) */`)
//     }

//     return new Promise((resolve, reject) => {
//       this.connection.query(sql, args, (err: any, rows: any) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(rows)
//         }
//       })
//     })
//   }
// }
