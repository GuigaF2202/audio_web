// src/routes/audio.routes.js
import { Router } from 'express';
import { AudioController } from '../controllers/audio.controller.js';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.use(authenticate); // Todas as rotas de áudio requerem autenticação

router.post('/upload', 
  upload.single('audio'), 
  AudioController.upload
);

router.get('/my-audios', 
  AudioController.getUserAudios
);

router.delete('/:id', 
  AudioController.deleteAudio
);

export default router;
