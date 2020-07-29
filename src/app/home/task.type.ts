export interface Task{
  id: number;
  taskTitle: string;
  progress: [number, number];
  taskDescription: string;
  taskDetails: string[];
}
