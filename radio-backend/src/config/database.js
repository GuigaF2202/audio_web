import pg from 'pg';
import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Configuração de logging
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// Configuração da pool do PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'test' ? { rejectUnauthorized: false } : undefined,
});

// Eventos da pool
pool.on('connect', () => logger.info('Nova conexão com o banco de dados'));
pool.on('error', (err) => logger.error('Erro na pool do PostgreSQL:', err));

// Função para executar queries
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug(`Query executada: ${text}`, {
      duration: `${duration}ms`,
      parameters: params,
    });
    return res;
  } catch (err) {
    logger.error(`Erro na query: ${text}`, {
      error: err.message,
      stack: err.stack,
    });
    throw err;
  }
};

// Função para fechar a pool
export const closePool = async () => {
  try {
    await pool.end();
    logger.info('Pool do PostgreSQL fechada com sucesso');
  } catch (err) {
    logger.error('Erro ao fechar a pool do PostgreSQL:', err);
    throw err;
  }
};

// Exportar a pool e funções para uso em outros módulos
export default {
  query,
  closePool,
  pool,
};
