import { Request, Response } from 'express';
import { pool } from '../config/database';

export const getData = (req: Request, res: Response) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('SELECT * FROM your_table', (error, results) => {
      connection.release();
      if (error) throw error;
      res.json(results);
    });
  });
};