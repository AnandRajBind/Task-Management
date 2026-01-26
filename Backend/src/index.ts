import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler.middleware';
import prisma from './config/database';

const app = express();

// Middleware - CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = Array.isArray(env.corsOrigin) ? env.corsOrigin : [env.corsOrigin];
    
    // Check if the origin is allowed or matches Vercel preview pattern
    const isAllowed = allowedOrigins.some(allowed => 
      origin === allowed || 
      origin.endsWith('.vercel.app') // Allow all Vercel deployments
    );
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: env.nodeEnv 
  });
});

// Routes
app.use('/api', routes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = env.port;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${env.nodeEnv}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
