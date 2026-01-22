import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import {
  createTaskSchema,
  updateTaskSchema,
  getTasksSchema,
} from '../validators/task.validator';

const router = Router();
const taskController = new TaskController();

// All task routes require authentication
router.use(authenticate);

router.get('/', validate(getTasksSchema), taskController.getTasks);
router.post('/', validate(createTaskSchema), taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.patch('/:id', validate(updateTaskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/toggle', taskController.toggleTaskStatus);

export default router;
