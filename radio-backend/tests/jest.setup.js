import mongoose from 'mongoose';
import redis from '../src/config/redis.js';

export default async () => {
  await mongoose.connect(process.env.TEST_DB_URI);
  await redis.connect();
  
  // Inicializar dados mockados
  await globalThis.__SUPABASE_MOCK__.init();
};
