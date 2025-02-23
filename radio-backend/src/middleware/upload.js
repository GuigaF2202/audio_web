// src/middleware/upload.js
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Use path.join para garantir o caminho correto independente do SO
      const uploadPath = path.join(__dirname, '../../uploads');
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = crypto.randomBytes(16).toString('hex');
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  });
  

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'audio/mp3',
    'audio/wav',
    'audio/flac',
    'audio/aac'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de arquivo inválido'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  }
});
