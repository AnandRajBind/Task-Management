import dotenv from 'dotenv';

dotenv.config();

// Validate required environment variables in production
if (process.env.NODE_ENV === 'production') {
  const required = ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET', 'DATABASE_URL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
  jwtAccessExpiry: (process.env.JWT_ACCESS_EXPIRY || '15m') as string,
  jwtRefreshExpiry: (process.env.JWT_REFRESH_EXPIRY || '7d') as string,
  corsOrigin: process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
    : ['http://localhost:3000'],
};
