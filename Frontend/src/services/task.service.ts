import apiClient from '@/lib/apiClient';
import {
  TasksResponse,
  TaskResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskStatus,
} from '@/types';

export const taskService = {
  async getTasks(
    page: number = 1,
    limit: number = 10,
    status?: TaskStatus,
    search?: string
  ): Promise<TasksResponse> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (status) params.append('status', status);
    if (search) params.append('search', search);

    const response = await apiClient.get(`/tasks?${params.toString()}`);
    return response.data;
  },

  async getTaskById(id: string): Promise<TaskResponse> {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  async createTask(data: CreateTaskRequest): Promise<TaskResponse> {
    const response = await apiClient.post('/tasks', data);
    return response.data;
  },

  async updateTask(id: string, data: UpdateTaskRequest): Promise<TaskResponse> {
    const response = await apiClient.patch(`/tasks/${id}`, data);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  },

  async toggleTaskStatus(id: string): Promise<TaskResponse> {
    const response = await apiClient.patch(`/tasks/${id}/toggle`);
    return response.data;
  },
};
