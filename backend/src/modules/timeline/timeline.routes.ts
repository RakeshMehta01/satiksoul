import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as controller from './timeline.controller';

const router = Router();

// Configure local multer disk storage for timeline photos
const dir = path.join(process.cwd(), 'uploads', 'timeline');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, dir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = /jpe?g|png|webp|gif/;
  const isImage = allowed.test(path.extname(file.originalname).toLowerCase()) || file.mimetype.startsWith('image/');
  if (isImage) {
    cb(null, true);
  } else {
    cb(new Error('Only photo files (jpg, png, webp, gif) are allowed in the timeline.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit per photo
});

// Protect all timeline scrapbook endpoints under Clerk session authentication
router.use(requireAuth());

router.get('/', controller.list);
router.post('/', upload.array('images', 6), controller.create);
router.post('/:id/react', controller.react);

export default router;
