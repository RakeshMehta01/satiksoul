import { Request, Response } from 'express';
import { getAuth } from '@clerk/express';
import * as svc from './relationship.service';

const wrap = (fn: (req: Request, res: Response) => Promise<unknown>) =>
  async (req: Request, res: Response) => {
    try { res.json({ success: true, data: await fn(req, res) }); }
    catch (e: any) { res.status(e.status || 500).json({ success: false, message: e.message }); }
  };

// Fetch current user's active relationship
export const getMine = wrap(async (req) => {
  const { userId } = getAuth(req);
  return svc.getRelationshipForUser(userId || '');
});

// Create relationship space
export const create = wrap(async (req) => {
  const { userId } = getAuth(req);
  const { relationshipName, anniversaryDate } = req.body;
  return svc.createRelationship(userId || '', relationshipName, anniversaryDate);
});

// Update relationship settings
export const update = wrap(async (req) => {
  const { userId } = getAuth(req);
  return svc.updateRelationship(userId || '', req.params.id, req.body);
});

// Fetch presence stats of relationship partners
export const getPresence = wrap(async (req) => {
  return svc.getPresence(req.params.id);
});

// Update current user's presence status in the relationship
export const updatePresence = wrap(async (req) => {
  const { userId } = getAuth(req);
  const { status, customStatus } = req.body;
  return svc.updatePresence(req.params.id, userId || '', status, customStatus);
});

// Fetch activity feed logs for workspace home
export const getActivities = wrap(async (req) => {
  return svc.getSharedActivities(req.params.id);
});
