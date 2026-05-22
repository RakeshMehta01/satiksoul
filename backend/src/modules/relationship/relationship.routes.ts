import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import * as relController from './relationship.controller';
import * as inviteController from './invite.controller';

const router = Router();

// Public invitation routes
router.get('/invite/details/:code', inviteController.getInviteDetails);

// Relationship core routes
router.get('/mine', requireAuth(), relController.getMine);
router.post('/', requireAuth(), relController.create);
router.put('/:id', requireAuth(), relController.update);

// Real-time presences and shared timeline activity logging
router.get('/:id/presence', requireAuth(), relController.getPresence);
router.post('/:id/presence', requireAuth(), relController.updatePresence);
router.get('/:id/activities', requireAuth(), relController.getActivities);

// Invitation code pairing routes
router.post('/invite', requireAuth(), inviteController.createInvite);
router.post('/invite/accept', requireAuth(), inviteController.acceptInvite);
router.get('/:relationshipId/invite', requireAuth(), inviteController.getInvite);


export default router;
