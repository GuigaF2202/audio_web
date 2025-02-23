import { newDb } from 'pg-mem';

// Cria uma instância do banco de dados em memória
const db = newDb();

// Simula a função `query`
export const query = async (text, params) => {
  const res = await db.public.query(text, params);
  return res;
};

// Simula a função `closePool`
export const closePool = async () => {
  console.log('Pool fechada (mock)');
};
