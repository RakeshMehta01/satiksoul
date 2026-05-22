import { Request, Response } from 'express';
import { getAuth } from '@clerk/express';
import * as svc from './futureMessage.service';

const wrap = (fn: (req: Request, res: Response) => Promise<unknown>) =>
  async (req: Request, res: Response) => {
    try { res.json({ success: true, data: await fn(req, res) }); }
    catch (e: any) { res.status(e.status || 500).json({ success: false, message: e.message }); }
  };

export const create = wrap(async (req) => {
  const { userId } = getAuth(req);
  console.log('--- DEBUG auth & body ---');
  console.log('userId from getAuth:', userId);
  console.log('req.body:', req.body);
  return svc.createMessage(userId || '', req.body, (req as any).files || []);
});

export const getAll = wrap(async (req) => {
  const { userId } = getAuth(req);
  return svc.getAllMessages(userId || '');
});

export const getOne = wrap(async (req) => {
  const { userId } = getAuth(req);
  return svc.getMessage(userId || '', req.params.id);
});

export const update = wrap(async (req) => {
  const { userId } = getAuth(req);
  return svc.updateMessage(userId || '', req.params.id, req.body);
});

export const remove = wrap(async (req) => {
  const { userId } = getAuth(req);
  return svc.deleteMessage(userId || '', req.params.id);
});
