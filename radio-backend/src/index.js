import app from './app.js';
import { pool } from './config/database.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 4000;
let server;

/**
 * Verifica a conexão com o banco de dados.
 * @throws {Error} Se a conexão falhar.
 */
async function checkDatabaseConnection() {
  try {
    await pool.query('SELECT NOW()');
    logger.info('✅ Conexão com o banco de dados estabelecida');
  } catch (err) {
    logger.error('❌ Falha na conexão com o banco:', err);
    throw err;
  }
}

/**
 * Inicia o servidor HTTP.
 */
async function startServer() {
  try {
    await checkDatabaseConnection();

    server = app.listen(PORT, () => {
      logger.info(`🚀 Servidor rodando na porta ${PORT} (${process.env.NODE_ENV})`);
    });

    setupGracefulShutdown();
  } catch (err) {
    logger.error('Erro fatal ao iniciar servidor:', err);
    process.exit(1);
  }
}

/**
 * Configura o graceful shutdown para sinais de término e exceções.
 */
function setupGracefulShutdown() {
  const signals = ['SIGTERM', 'SIGINT'];

  signals.forEach((signal) => {
    process.on(signal, async () => {
      logger.info(`${signal} recebido. Iniciando graceful shutdown...`);
      await gracefulShutdown();
    });
  });

  process.on('uncaughtException', (err) => {
    logger.error('Exceção não capturada:', err);
    gracefulShutdown(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Promessa rejeitada não tratada:', reason);
    gracefulShutdown(1);
  });
}

/**
 * Realiza o graceful shutdown do servidor e pool de conexões.
 * @param {number} exitCode - Código de saída do processo.
 */
async function gracefulShutdown(exitCode = 0) {
  try {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      logger.info('Servidor HTTP fechado');
    }

    if (pool) {
      await pool.end();
      logger.info('Pool de conexões do banco fechado');
    }
  } catch (err) {
    logger.error('Erro durante shutdown:', err);
    exitCode = 1;
  } finally {
    logger.info(`Processo finalizado com código: ${exitCode}`);
    process.exit(exitCode);
  }
}

// Iniciar servidor
startServer().catch((err) => {
  logger.error('Falha ao iniciar aplicação:', err);
  process.exit(1);
});
