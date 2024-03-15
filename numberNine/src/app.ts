import express, { Request, Response, NextFunction } from 'express';
import { createEntity, readEntity, updateEntity, deleteEntity } from './crud';

const app = express();
const port = 3000;

app.use(express.json());

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({ message: 'Terjadi kesalahan dalam server' });
});

app.post('/api/entities', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entityId = await createEntity(req.body);
    res.status(201).json({ id: entityId });
  } catch (error) {
    next(error); 
  }
});

app.get('/api/entities/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entityId = parseInt(req.params.id);
    const entity = await readEntity(entityId);
    if (entity) {
      res.json(entity);
    } else {
      res.status(404).json({ message: 'Entitas tidak ditemukan' });
    }
  } catch (error) {
    next(error); 
  }
});

app.put('/api/entities/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entityId = parseInt(req.params.id);
    const updated = await updateEntity(entityId, req.body);
    if (updated) {
      res.json({ message: 'Entitas berhasil diperbarui' });
    } else {
      res.status(404).json({ message: 'Entitas tidak ditemukan' });
    }
  } catch (error) {
    next(error); 
  }
});

app.delete('/api/entities/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entityId = parseInt(req.params.id);
    const deleted = await deleteEntity(entityId);
    if (deleted) {
      res.json({ message: 'Entitas berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Entitas tidak ditemukan' });
    }
  } catch (error) {
    next(error); 
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ message: 'Permintaan tidak valid' });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});