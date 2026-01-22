import { z } from 'zod';
import { TaskStatus } from '../types';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus).optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus).optional(),
  }),
});

export const getTasksSchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => (val ? parseInt(val) : 1)),
    limit: z.string().optional().transform(val => (val ? parseInt(val) : 10)),
    status: z.nativeEnum(TaskStatus).optional(),
    search: z.string().optional(),
  }),
});
