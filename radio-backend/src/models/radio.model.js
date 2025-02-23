import { query } from '../config/database.js';
import Joi from 'joi';

const radioSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  frequency: Joi.string().pattern(/^\d+\.\d+$/).required(),
  url: Joi.string().uri().required()
});

export class RadioModel {
  static async create(data) {
    const { error } = radioSchema.validate(data);
    if (error) throw new Error(`Validação falhou: ${error.details[0].message}`);

    const { rows } = await query(
      `INSERT INTO radios (name, frequency, stream_url) 
       VALUES ($1, $2, $3)
       RETURNING id, name, frequency, stream_url, created_at`,
      [data.name, data.frequency, data.url]
    );
    return rows[0];
  }

  static async findAll() {
    const { rows } = await query(
      `SELECT id, name, frequency, stream_url, created_at 
       FROM radios 
       WHERE deleted_at IS NULL 
       ORDER BY created_at DESC`
    );
    return rows;
  }
}