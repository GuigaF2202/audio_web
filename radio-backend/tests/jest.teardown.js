import mongoose from 'mongoose';
import redis from '../src/config/redis.js';

export default async () => {
  await mongoose.disconnect();
  await redis.quit();
  
  // Limpar dados de teste
  await globalThis.__SUPABASE_MOCK__.cleanup();
};
