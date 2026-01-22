import { Request } from 'express';

export interface AuthUser {
  userId: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  status?: TaskStatus;
  search?: string;
}
