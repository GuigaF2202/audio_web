// src/routes/index.js
import { Router } from 'express';
import audioRoutes from './audio.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/audio', audioRoutes);

export default router;
