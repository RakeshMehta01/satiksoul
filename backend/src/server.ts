import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/db';
import memoriesRouter from './routes/memories.route';
import futureMessageRouter from './modules/future-message/futureMessage.routes';
import relationshipRouter from './modules/relationship/relationship.routes';
import timelineRouter from './modules/timeline/timeline.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

connectDB();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.use('/api/memories', memoriesRouter);
app.use('/api/future-messages', futureMessageRouter);
app.use('/api/relationship', relationshipRouter);
app.use('/api/timeline', timelineRouter);

app.use('/api/assistant', (_req: Request, res: Response) => {
  res.json({ message: 'AI Curator Assistant endpoint scaffold' });
});

app.use((err: Error, _req: Request, res: Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong' });
});

app.listen(PORT, () => console.log(`SatikSoul Server running on port ${PORT}`));
