// src/services/audio.service.js
import fs from 'fs/promises';
import path from 'path';
import logger from '../utils/logger.js';

export class AudioService {
  static async deleteFile(filePath) {
    try {
      await fs.unlink(filePath);
      logger.info(`Arquivo deletado com sucesso: ${filePath}`);
    } catch (error) {
      logger.error(`Erro ao deletar arquivo: ${filePath}`, error);
      throw error;
    }
  }

  static async validateAudioFile(file) {
    const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/flac', 'audio/aac'];
    const maxSize = 100 * 1024 * 1024; // 100MB

    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Tipo de arquivo não suportado');
    }

    if (file.size > maxSize) {
      throw new Error('Arquivo muito grande');
    }

    return true;
  }
}
