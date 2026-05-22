import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { upload } from '../../middleware/upload.middleware';
import * as ctrl from './futureMessage.controller';

const router = Router();
router.use(requireAuth());

router.post('/', upload.array('files', 5), ctrl.create);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
