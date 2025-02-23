import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGINS.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('combined'));

// Health Check
app.get('/health', (req, res) => 
  res.status(200).json({ status: 'ok', timestamp: new Date() }));

export default app;