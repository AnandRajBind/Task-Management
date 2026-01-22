import prisma from '../config/database';
import { TaskStatus, PaginationQuery } from '../types';
import { AppError } from '../middleware/errorHandler.middleware';

export class TaskService {
  async createTask(
    userId: string,
    title: string,
    description?: string,
    status?: TaskStatus
  ) {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || TaskStatus.PENDING,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return task;
  }

  async getTasks(userId: string, query: PaginationQuery) {
    const { page = 1, limit = 10, status, search } = query;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = { userId };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.title = {
        contains: search,
      };
    }

    // Get tasks with pagination
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.task.count({ where }),
    ]);

    return {
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getTaskById(taskId: string, userId: string) {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return task;
  }

  async updateTask(
    taskId: string,
    userId: string,
    data: {
      title?: string;
      description?: string;
      status?: TaskStatus;
    }
  ) {
    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existingTask) {
      throw new AppError('Task not found', 404);
    }

    // Update task
    const task = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    return task;
  }

  async deleteTask(taskId: string, userId: string) {
    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existingTask) {
      throw new AppError('Task not found', 404);
    }

    // Delete task
    await prisma.task.delete({
      where: { id: taskId },
    });

    return { message: 'Task deleted successfully' };
  }

  async toggleTaskStatus(taskId: string, userId: string) {
    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existingTask) {
      throw new AppError('Task not found', 404);
    }

    // Toggle status logic
    let newStatus: TaskStatus;
    switch (existingTask.status) {
      case TaskStatus.PENDING:
        newStatus = TaskStatus.IN_PROGRESS;
        break;
      case TaskStatus.IN_PROGRESS:
        newStatus = TaskStatus.COMPLETED;
        break;
      case TaskStatus.COMPLETED:
        newStatus = TaskStatus.PENDING;
        break;
      default:
        newStatus = TaskStatus.PENDING;
    }

    // Update task
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    });

    return task;
  }
}
