import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    message: 'SatikSoul API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// Route Scaffolds
app.use('/api/auth', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Auth endpoint scaffold' });
});

app.use('/api/memories', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Memories endpoint scaffold' });
});

app.use('/api/assistant', (req: Request, res: Response) => {
  res.status(200).json({ message: 'AI Curator Assistant endpoint scaffold' });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong inside the server'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`SatikSoul Server running on port ${PORT}`);
});
