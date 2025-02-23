import app from './app.js';
import { pool } from './config/database.js';

const PORT = process.env.PORT || 4000;

// Verificar conexão com o banco
try {
  await pool.query('SELECT NOW()');
  console.log('✅ Conexão com o banco de dados estabelecida');
} catch (err) {
  console.error('❌ Falha na conexão com o banco:', err);
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT} (${process.env.NODE_ENV})`);
});