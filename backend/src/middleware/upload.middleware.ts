import multer from 'multer';
import path from 'path';
import fs from 'fs';

const dir = path.join(process.cwd(), 'uploads', 'future-messages');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, dir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${path.extname(file.originalname)}`),
});

const allowed = /jpe?g|png|webp|mp3|wav|ogg|mp4/;
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  allowed.test(path.extname(file.originalname).toLowerCase()) ? cb(null, true) : cb(new Error('Invalid file type'));
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
