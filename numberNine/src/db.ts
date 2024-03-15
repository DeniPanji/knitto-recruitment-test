import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: '123456', 
  database: 'knittoDatabase' 
});

export async function getConnection() {
  return await pool.getConnection();
}