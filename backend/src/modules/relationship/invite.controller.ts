import { Request, Response } from 'express';
import { getAuth } from '@clerk/express';
import * as svc from './invite.service';

const wrap = (fn: (req: Request, res: Response) => Promise<unknown>) =>
  async (req: Request, res: Response) => {
    try { res.json({ success: true, data: await fn(req, res) }); }
    catch (e: any) { res.status(e.status || 500).json({ success: false, message: e.message }); }
  };

// Generate invitation code for partner pairing
export const createInvite = wrap(async (req) => {
  const { userId } = getAuth(req);
  const { relationshipId, inviteeEmail } = req.body;
  return svc.createInvite(relationshipId, userId || '', inviteeEmail);
});

// Accept a pairing code to join one shared world
export const acceptInvite = wrap(async (req) => {
  const { userId } = getAuth(req);
  const { inviteCode } = req.body;
  return svc.acceptInvite(inviteCode, userId || '');
});

// Get pending active invite for the relationship workspace
export const getInvite = wrap(async (req) => {
  return svc.getInviteForRelationship(req.params.relationshipId);
});

// Get public invite details by code
export const getInviteDetails = wrap(async (req) => {
  return svc.getInviteDetails(req.params.code);
});

