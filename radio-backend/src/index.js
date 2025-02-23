import app from './app.js';
import { pool } from './config/database.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 4000;
let server;

async function checkDatabaseConnection() {
  try {
    await pool.query('SELECT NOW()');
    logger.info('✅ Conexão com o banco de dados estabelecida');
  } catch (err) {
    logger.error('❌ Falha na conexão com o banco:', err);
    throw err;
  }
}

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

function setupGracefulShutdown() {
  // Tratamento de sinais de término
  const signals = ['SIGTERM', 'SIGINT'];
  
  signals.forEach((signal) => {
    process.on(signal, async () => {
      logger.info(`${signal} recebido. Iniciando graceful shutdown...`);
      
      // Parar de aceitar novas conexões
      server.close(async () => {
        logger.info('Servidor HTTP fechado');
        
        try {
          // Fechar pool de conexões do banco
          await pool.end();
          logger.info('Pool de conexões do banco fechado');
          
          logger.info('Processo finalizado com sucesso');
          process.exit(0);
        } catch (err) {
          logger.error('Erro durante shutdown:', err);
          process.exit(1);
        }
      });

      // Se o servidor não fechar em 10s, forçar saída
      setTimeout(() => {
        logger.error('Timeout durante shutdown, forçando saída');
        process.exit(1);
      }, 10000);
    });
  });

  // Tratamento de exceções não capturadas
  process.on('uncaughtException', (err) => {
    logger.error('Exceção não capturada:', err);
    gracefulShutdown(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Promessa rejeitada não tratada:', reason);
    gracefulShutdown(1);
  });
}

async function gracefulShutdown(exitCode = 0) {
  try {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      logger.info('Servidor HTTP fechado');
    }
    
    await pool.end();
    logger.info('Pool de conexões do banco fechado');
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
