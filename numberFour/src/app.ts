import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Tidak ada file yang diunggah' });
  }
  res.json({ message: 'File berhasil diunggah', filename: req.file.filename });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});