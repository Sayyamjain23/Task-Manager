import { describe, test, expect, beforeEach } from 'vitest';
import taskReducer, { addTask, toggleTask, deleteTask, setFilter } from '../store/taskSlice';
import { TaskState } from '../types';

describe('Task Reducer', () => {
  let initialState: TaskState;

  beforeEach(() => {
    initialState = {
      tasks: [
        { id: '1', title: 'Test Task 1', completed: false, createdAt: 1000 },
        { id: '2', title: 'Test Task 2', completed: true, createdAt: 2000 }
      ],
      filter: 'all'
    };
  });

  test('should return the initial state', () => {
    expect(taskReducer(undefined, { type: 'unknown' })).toEqual({
      tasks: [],
      filter: 'all'
    });
  });

  test('should handle addTask', () => {
    const newState = taskReducer(initialState, addTask('New Task'));
    expect(newState.tasks.length).toBe(3);
    expect(newState.tasks[2].title).toBe('New Task');
    expect(newState.tasks[2].completed).toBe(false);
  });

  test('should handle toggleTask', () => {
    const newState = taskReducer(initialState, toggleTask('1'));
    expect(newState.tasks[0].completed).toBe(true);
    
    const anotherState = taskReducer(newState, toggleTask('1'));
    expect(anotherState.tasks[0].completed).toBe(false);
  });

  test('should handle deleteTask', () => {
    const newState = taskReducer(initialState, deleteTask('1'));
    expect(newState.tasks.length).toBe(1);
    expect(newState.tasks[0].id).toBe('2');
  });

  test('should handle setFilter', () => {
    const newState = taskReducer(initialState, setFilter('completed'));
    expect(newState.filter).toBe('completed');
  });
});