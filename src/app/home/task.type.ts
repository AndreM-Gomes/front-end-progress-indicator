import { Subtask } from './subtask.type';

export interface Task{
  id: number;
  taskTitle: string;
  taskDescription: string;
  taskDetails: Subtask[];
  completed: boolean;
}
