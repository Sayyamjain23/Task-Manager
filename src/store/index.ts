import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import { saveState } from './localStorage';
import { throttle } from '../utils/throttle';
import { TaskState } from '../types';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

// Save state to localStorage whenever the store changes
store.subscribe(
  throttle(() => {
    const state = store.getState();
    saveState(state.tasks as TaskState);
  }, 1000)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;