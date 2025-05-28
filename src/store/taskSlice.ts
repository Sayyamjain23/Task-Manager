import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskFilter, TaskState } from '../types';
import { loadState } from './localStorage';

const initialState: TaskState = loadState() || {
  tasks: [],
  filter: 'all',
};

const createRecurringTask = (task: Task): Task => {
  const now = Date.now();
  let nextDate = new Date(now);

  switch (task.recurrence) {
    case 'daily':
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case 'weekly':
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case 'monthly':
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
  }

  return {
    ...task,
    id: crypto.randomUUID(),
    completed: false,
    createdAt: nextDate.getTime(),
    lastCompleted: undefined,
  };
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; recurrence?: 'daily' | 'weekly' | 'monthly' }>) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        completed: false,
        createdAt: Date.now(),
        recurrence: action.payload.recurrence || null,
      };
      state.tasks.push(newTask);
    },
    
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        if (task.completed && task.recurrence) {
          task.lastCompleted = Date.now();
          state.tasks.push(createRecurringTask(task));
        }
      }
    },
    
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    
    setFilter: (state, action: PayloadAction<TaskFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;