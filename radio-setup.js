#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configurações avançadas
const CONFIG = {
  projectName: 'radio-backend',
  nodeVersion: '20.18.3',
  dependencies: [
    'express', 'dotenv', 'pg', 'cors', 'helmet',
    'jsonwebtoken', 'winston', 'morgan', 'joi',
    'uuid', 'bcryptjs'
  ],
  devDependencies: [
    'nodemon', 'eslint', 'prettier', 'jest',
    'supertest', '@types/node', '@types/express'
  ]
};

// Utilitários
const log = {
  success: (msg) => console.log(`\x1b[32m✓ ${msg}\x1b[0m`),
  info: (msg) => console.log(`\x1b[36mℹ ${msg}\x1b[0m`),
  error: (msg) => console.error(`\x1b[31m✗ ${msg}\x1b[0m`)
};

// Conteúdo dos arquivos
const FILE_CONTENT = {
  // Configuração principal
  'src/config/database.js': `
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
    logger.debug(\`Query executada: \${text}\`, {
      duration: \`\${duration}ms\`,
      parameters: params
    });
    return res;
  } catch (err) {
    logger.error(\`Erro na query: \${text}\`, {
      error: err.message,
      stack: err.stack
    });
    throw err;
  }
};
`,

  'src/models/radio.model.js': `
import { query } from '../config/database.js';
import Joi from 'joi';

const radioSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  frequency: Joi.string().pattern(/^\\d+\\.\\d+$/).required(),
  url: Joi.string().uri().required()
});

export class RadioModel {
  static async create(data) {
    const { error } = radioSchema.validate(data);
    if (error) throw new Error(\`Validação falhou: \${error.details[0].message}\`);

    const { rows } = await query(
      \`INSERT INTO radios (name, frequency, stream_url) 
       VALUES ($1, $2, $3)
       RETURNING id, name, frequency, stream_url, created_at\`,
      [data.name, data.frequency, data.url]
    );
    return rows[0];
  }

  static async findAll() {
    const { rows } = await query(
      \`SELECT id, name, frequency, stream_url, created_at 
       FROM radios 
       WHERE deleted_at IS NULL 
       ORDER BY created_at DESC\`
    );
    return rows;
  }
}
`,

  'src/app.js': `
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGINS.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('combined'));

// Health Check
app.get('/health', (req, res) => 
  res.status(200).json({ status: 'ok', timestamp: new Date() }));

export default app;
`,

  '.env.example': `
# Configuração do Banco de Dados
DATABASE_URL="postgresql://usuario:senha@host:porta/banco"
DB_SSL_CERT="-----BEGIN CERTIFICATE-----\\n...\\n-----END CERTIFICATE-----"

# Segurança
JWT_SECRET="chave_secreta_complexa_minimo_32_caracteres"
JWT_EXPIRES_IN="1h"
BCRYPT_SALT_ROUNDS=12

# CORS
CORS_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"

# Ambiente
NODE_ENV="development"
PORT=4000
`,

  '.eslintrc.json': `
{
  "extends": ["eslint:recommended", "prettier"],
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "es2021": true
  },
  "rules": {
    "no-console": "warn",
    "semi": ["error", "never"],
    "quotes": ["error", "single"]
  }
}
`,

  'package.json': `
{
  "name": "${CONFIG.projectName}",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon --experimental-specifier-resolution=node src/index.js",
    "start": "node --experimental-specifier-resolution=node src/index.js",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "NODE_ENV=test jest --watchAll"
  },
  "dependencies": {
    ${CONFIG.dependencies.map(dep => `"${dep}": "^latest"`).join(',\n    ')}
  },
  "devDependencies": {
    ${CONFIG.devDependencies.map(dep => `"${dep}": "^latest"`).join(',\n    ')}
  }
}
`,

  'src/index.js': `
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
  console.log(\`🚀 Servidor rodando na porta \${PORT} (\${process.env.NODE_ENV})\`);
});
`
};

class ProjectSetup {
  constructor() {
    this.projectRoot = path.join(process.cwd(), CONFIG.projectName);
  }

  async createDirectories() {
    const dirs = [
      ...new Set([
      'src/config',
      'src/controllers',
      'src/middleware',
      'src/models',
      'src/routes',
      'src/services',
      'src/utils',
      'src/validators',
      'migrations',
      'tests/unit',
      'tests/integration',
      'docs'
    ])];

    for (const dir of dirs) {
      const dirPath = path.join(this.projectRoot, dir);
      try {
        await fs.mkdir(dirPath, { recursive: true });
        log.success(`Diretório criado: ${dirPath.replace(process.cwd(), '')}`);
      } catch (err) {
        log.error(`Falha ao criar diretório: ${dirPath}`);
        throw err;
      }
    }
  }

  async createFiles() {
    const files = Object.entries(FILE_CONTENT);
    
    for (const [filePath, content] of files) {
      const fullPath = path.join(this.projectRoot, filePath);
      try {
        await fs.writeFile(fullPath, content.trim());
        log.success(`Arquivo criado: ${fullPath.replace(process.cwd(), '')}`);
      } catch (err) {
        log.error(`Falha ao criar arquivo: ${fullPath}`);
        throw err;
      }
    }
  }

  async initProject() {
    try {
      log.info(`Iniciando setup do projeto: ${CONFIG.projectName}`);
      
      // Verificar se o diretório já existe
      if (await this.dirExists(this.projectRoot)) {
        const overwrite = await this.promptOverwrite();
        if (!overwrite) process.exit(0);
        await fs.rm(this.projectRoot, { recursive: true });
      }

      await this.createDirectories();
      await this.createFiles();
      await this.postInstallInstructions();

    } catch (err) {
      log.error(`Erro durante a instalação: ${err.message}`);
      process.exit(1);
    }
  }

  async dirExists(path) {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }

  async promptOverwrite() {
    const readline = (await import('readline')).default;
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question(
        `⚠️  O diretório "${CONFIG.projectName}" já existe. Sobrescrever? (y/N) `,
        (answer) => {
          rl.close();
          resolve(answer.toLowerCase() === 'y');
        }
      );
    });
  }

  async postInstallInstructions() {
    const steps = [
      `cd ${CONFIG.projectName}`,
      'npm install',
      'cp .env.example .env',
      'Editar o arquivo .env com suas configurações',
      'npm run dev'
    ];

    log.info('Instalação concluída com sucesso!');
    console.log('\nPróximos passos:\n' + steps.map((s, i) => ` ${i + 1}. ${s}`).join('\n'));
    console.log('\nDica: Use Node.js ' + CONFIG.nodeVersion);
    console.log(`Verifique com: node -v\n`);
  }
}

// Executar setup
(async () => {
  try {
    const setup = new ProjectSetup();
    await setup.initProject();
  } catch (err) {
    log.error(err.message);
    process.exit(1);
  }
})();
