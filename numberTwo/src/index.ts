import express, { Request, Response } from 'express';
import { authMiddleware } from './middlewares/auth';

const app = express();
const port = 3000;

app.use(express.json());

// Contoh rute yang membutuhkan otentikasi
app.get('/api/private', authMiddleware, (req: Request, res: Response) => {
  res.json({ message: 'Halo, ini adalah rute yang memerlukan otentikasi!', user: (req as any).user });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});