import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
import rateLimit from 'express-rate-limit';
import usersRouter from './routes/users.js';

const app = express();

// Configurações de segurança do Helmet
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:", "*"],
      mediaSrc: ["'self'", "data:", "blob:", "*"],
      connectSrc: ["'self'", "*"],
    },
  }
}));

// Configuração de CORS
const corsOptions = {
  origin: process.env.CORS_ORIGINS?.split(',') || ['https://audioweb.com.br'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'CF-Connecting-IP',
    'CF-IPCountry',
    'CF-RAY',
    'CF-Visitor'
  ],
  credentials: true,
  maxAge: 86400, // 24 horas
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Configuração do parser JSON com limite
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configuração de logs
app.use(morgan('combined', {
  skip: (req, res) => req.path === '/health' // Não loga health checks
}));

// Configuração para confiar no proxy do Cloudflare (ajustado para ser mais seguro)
app.set('trust proxy', 1); // Confia apenas no primeiro proxy

// Middleware para capturar IP real através do Cloudflare
app.use((req, res, next) => {
  req.realIP = req.headers['cf-connecting-ip'] || req.ip;
  next();
});

// Rate Limiting básico
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite por IP
  message: 'Muitas requisições deste IP, por favor tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/health' // Não aplica limite ao health check
});

app.use(limiter);

// Middleware de timeout
app.use((req, res, next) => {
  req.setTimeout(30000, () => {
    if (!res.headersSent) {
      res.status(408).send('Request Timeout');
    }
  });
  next();
});

// Rota lenta para teste de timeout
app.get('/slow-route', (req, res) => {
  setTimeout(() => {
    if (!res.headersSent) {
      res.send('Esta rota é lenta');
    }
  }, 40000); // 40 segundos
});

// Rota para simular erro interno
app.get('/error-route', (req, res, next) => {
  next(new Error('Erro interno do servidor'));
});

// Health Check aprimorado
app.get('/health', (req, res) => {
  const healthCheck = {
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    cloudflare: {
      ip: req.headers['cf-connecting-ip'],
      country: req.headers['cf-ipcountry'],
      ray: req.headers['cf-ray']
    }
  };
  
  res.status(200).json(healthCheck);
});

// Rotas de API
app.use('/api/users', usersRouter);

// Error Handling Global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: process.env.NODE_ENV === 'production' ? 'Erro interno do servidor' : err.message,
      status: err.status || 500
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Rota não encontrada',
      status: 404
    }
  });
});

export default app;
