import express, { Request, Response } from 'express';
import { createEntity, readEntity, updateEntity, deleteEntity } from './crud';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/entities', async (req: Request, res: Response) => {
  try {
    const entityId = await createEntity(req.body);
    res.status(201).json({ id: entityId });
  } catch (error) {
    console.error('Gagal membuat entitas:', error);
    res.status(500).json({ message: 'Gagal membuat entitas' });
  }
});

app.get('/api/entities/:id', async (req: Request, res: Response) => {
  try {
    const entityId = parseInt(req.params.id);
    const entity = await readEntity(entityId);
    if (entity) {
      res.json(entity);
    } else {
      res.status(404).json({ message: 'Entitas tidak ditemukan' });
    }
  } catch (error) {
    console.error('Gagal membaca entitas:', error);
    res.status(500).json({ message: 'Gagal membaca entitas' });
  }
});

app.put('/api/entities/:id', async (req: Request, res: Response) => {
  try {
    const entityId = parseInt(req.params.id);
    const updated = await updateEntity(entityId, req.body);
    if (updated) {
      res.json({ message: 'Entitas berhasil diperbarui' });
    } else {
      res.status(404).json({ message: 'Entitas tidak ditemukan' });
    }
  } catch (error) {
    console.error('Gagal memperbarui entitas:', error);
    res.status(500).json({ message: 'Gagal memperbarui entitas' });
  }
});

app.delete('/api/entities/:id', async (req: Request, res: Response) => {
  try {
    const entityId = parseInt(req.params.id);
    const deleted = await deleteEntity(entityId);
    if (deleted) {
      res.json({ message: 'Entitas berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Entitas tidak ditemukan' });
    }
  } catch (error) {
    console.error('Gagal menghapus entitas:', error);
    res.status(500).json({ message: 'Gagal menghapus entitas' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});