import { Request, Response } from 'express';
import { getAuth, clerkClient } from '@clerk/express';
import * as svc from './timeline.service';

const wrap = (fn: (req: Request, res: Response) => Promise<unknown>) =>
  async (req: Request, res: Response) => {
    try {
      res.json({ success: true, data: await fn(req, res) });
    } catch (e: any) {
      console.error('Timeline Controller Error:', e);
      res.status(e.status || 500).json({ success: false, message: e.message || 'Internal Server Error' });
    }
  };

export const create = wrap(async (req) => {
  const { userId } = getAuth(req);
  if (!userId) throw { status: 401, message: 'Unauthorized' };

  return svc.createTimelineItem(userId, req.body, (req as any).files || []);
});

export const list = wrap(async (req) => {
  const { userId } = getAuth(req);
  if (!userId) throw { status: 401, message: 'Unauthorized' };

  return svc.getTimeline(userId);
});

export const react = wrap(async (req) => {
  const { userId } = getAuth(req);
  if (!userId) throw { status: 401, message: 'Unauthorized' };

  // Fetch user profile from Clerk to get their premium display name
  const user = await clerkClient.users.getUser(userId);
  const userName = user.firstName
    ? `${user.firstName} ${user.lastName || ''}`.trim()
    : (user.username || 'Partner');

  const { emoji } = req.body;
  if (!emoji) throw { status: 400, message: 'Emoji is required to react.' };

  return svc.toggleReaction(userId, userName, req.params.id, emoji);
});
