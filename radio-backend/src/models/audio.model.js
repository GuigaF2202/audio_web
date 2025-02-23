// src/controllers/audio.controller.js
import { AudioModel } from '../models/audio.model.js';
import logger from '../utils/logger.js';
import { AudioService } from '../services/audio.service.js';

export class AudioController {
  static async upload(req, res) {
    try {
      const { file } = req;
      if (!file) {
        return res.status(400).json({
          status: 'error',
          message: 'Nenhum arquivo foi enviado'
        });
      }

      const audioData = {
        user_id: req.user.id,
        title: req.body.title,
        duration: parseFloat(req.body.duration)
      };

      const result = await AudioModel.create(audioData, file);

      res.status(201).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      logger.error('Erro no upload de áudio:', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          status: 'error',
          message: 'Dados inválidos',
          details: error.details
        });
      }
      res.status(500).json({
        status: 'error',
        message: 'Erro ao processar upload'
      });
    }
  }

  static async getUserAudios(req, res) {
    try {
      const { page, pageSize } = req.query;
      const userId = req.user.id;

      const result = await AudioModel.findByUser(userId, {
        page: parseInt(page) || 1,
        pageSize: parseInt(pageSize) || 10
      });

      res.json({
        status: 'success',
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      logger.error('Erro ao buscar áudios do usuário:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro ao buscar áudios'
      });
    }
  }

  static async deleteAudio(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const filePath = await AudioModel.delete(id, userId);
      
      // Deletar arquivo físico de forma assíncrona
      AudioService.deleteFile(filePath).catch(err => {
        logger.error('Erro ao deletar arquivo físico:', err);
      });

      res.json({
        status: 'success',
        message: 'Áudio deletado com sucesso'
      });
    } catch (error) {
      logger.error('Erro ao deletar áudio:', error);
      if (error.name === 'NotFoundError') {
        return res.status(404).json({
          status: 'error',
          message: error.message
        });
      }
      res.status(500).json({
        status: 'error',
        message: 'Erro ao deletar áudio'
      });
    }
  }
}
