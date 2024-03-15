import { getConnection } from './db';
import { RowDataPacket } from 'mysql2';

export async function createEntity(data: any) {
    const connection = await getConnection();
    try {
      const [result] = await connection.query('INSERT INTO your_table SET ?', [data]);
      if (result && 'insertId' in result) {
        return result.insertId;
      } else {
        throw new Error('Gagal membuat entitas baru');
      }
    } finally {
      connection.release(); 
    }
  }

  export async function readEntity(id: number) {
    const connection = await getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM your_table WHERE id = ?', [id]);
      return rows[0]; 
    } finally {
      connection.release(); 
    }
  }

export async function updateEntity(id: number, newData: any) {
  const connection = await getConnection();
  try {
    await connection.query('UPDATE your_table SET ? WHERE id = ?', [newData, id]);
    return true; 
  } finally {
    connection.release(); 
  }
}

export async function deleteEntity(id: number) {
  const connection = await getConnection();
  try {
    await connection.query('DELETE FROM your_table WHERE id = ?', [id]);
    return true; 
  } finally {
    connection.release(); 
  }
}