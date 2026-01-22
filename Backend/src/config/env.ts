import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
  jwtAccessExpiry: (process.env.JWT_ACCESS_EXPIRY || '15m') as string,
  jwtRefreshExpiry: (process.env.JWT_REFRESH_EXPIRY || '7d') as string,
};
