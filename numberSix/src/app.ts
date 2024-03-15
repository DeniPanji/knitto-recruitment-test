import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: '123456', 
  database: 'knittoDatabase' 
});

async function runTransaction() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    await connection.query('INSERT INTO table1 (column1, column2) VALUES (?, ?)', ['value1', 'value2']);

    await connection.query('INSERT INTO table2 (column1, column2) VALUES (?, ?)', ['value3', 'value4']);

    await connection.commit();
    console.log('Transaksi berhasil.');
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Terjadi kesalahan:', error);
  } finally {
    if (connection) {
      connection.release(); 
    }
  }
}

runTransaction();