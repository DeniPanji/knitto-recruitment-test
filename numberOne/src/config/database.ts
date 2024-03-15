import * as mysql from 'mysql';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'knittoDatabase',
  connectionLimit: 10
});

export { pool };