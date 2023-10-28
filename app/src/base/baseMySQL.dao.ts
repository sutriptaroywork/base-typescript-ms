// import MySQLQueryExecuter from '../../connections/mysql/mysqlQueryExecuter';

// export default class BaseMysqlDao {
//   public mySQLQueryExecuter: any;

//   constructor() {
//     this.mySQLQueryExecuter = new MySQLQueryExecuter();
//   }

//   create(tableName: string, fields: [], values: []) {
//     const valuesString = values.join()
//     if (fields.length > 0) {
//       const fieldsString = fields.join();
//       const query =  `INSERT INTO ${tableName} (${fieldsString}) VALUES (${valuesString});`;
//       return this.mySQLQueryExecuter.query(query);
//     }
//     const query =  `INSERT INTO ${tableName} VALUES (${valuesString});`;
//     return this.mySQLQueryExecuter.query(query);
//   }

//   getById(tableName: string, id: number | string, fields: [] = []) {
//     if (fields.length > 0) {
//       const fieldsString = fields.join();
//       const query = `SELECT ${fieldsString} FROM ${tableName} WHERE id = ?`;
//       return this.mySQLQueryExecuter.query(query, id);
//     }
//     const query = `SELECT * FROM ${tableName} WHERE id = ?`;
//     return this.mySQLQueryExecuter.query(query, id);
//   }
// }
