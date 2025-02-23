import pg from 'pg';
import winston from 'winston';

const { Pool } = pg;

// Configuração de logging
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
});

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { 
    rejectUnauthorized: true,
    ca: Buffer.from(process.env.DB_SSL_CERT, 'base64').toString('ascii')
  } : false,
  max: 20,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000
});

pool.on('connect', () => logger.info('Nova conexão com o banco de dados'));
pool.on('error', (err) => logger.error('Erro na pool do PostgreSQL:', err));

export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug(`Query executada: ${text}`, {
      duration: `${duration}ms`,
      parameters: params
    });
    return res;
  } catch (err) {
    logger.error(`Erro na query: ${text}`, {
      error: err.message,
      stack: err.stack
    });
    throw err;
  }
};