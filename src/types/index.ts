export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  recurrence?: 'daily' | 'weekly' | 'monthly' | null;
  lastCompleted?: number;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
}

export interface ShareOptions {
  title: string;
  text: string;
  url?: string;
}