import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../store/taskSlice';
import AddTask from '../components/AddTask';
import TaskItem from '../components/TaskItem';
import FilterTasks from '../components/FilterTasks';

// Mock store setup
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      tasks: taskReducer
    },
    preloadedState: {
      tasks: {
        tasks: [
          { id: '1', title: 'Test Task', completed: false, createdAt: Date.now() }
        ],
        filter: 'all',
        ...initialState
      }
    }
  });
};

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => {
  const actual = vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      button: ({ children, ...props }) => <button {...props}>{children}</button>,
      li: ({ children, ...props }) => <li {...props}>{children}</li>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

describe('AddTask Component', () => {
  test('renders input and button', () => {
    render(
      <Provider store={createTestStore()}>
        <AddTask />
      </Provider>
    );
    
    expect(screen.getByTestId('add-task-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-task-button')).toBeInTheDocument();
  });

  test('allows typing in the input', () => {
    render(
      <Provider store={createTestStore()}>
        <AddTask />
      </Provider>
    );
    
    const input = screen.getByTestId('add-task-input');
    fireEvent.change(input, { target: { value: 'New Task' } });
    expect(input).toHaveValue('New Task');
  });
});

describe('TaskItem Component', () => {
  const mockTask = { 
    id: '1', 
    title: 'Test Task', 
    completed: false, 
    createdAt: Date.now() 
  };
  
  test('renders task title', () => {
    render(
      <Provider store={createTestStore()}>
        <TaskItem task={mockTask} />
      </Provider>
    );
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  test('has toggle and delete buttons', () => {
    render(
      <Provider store={createTestStore()}>
        <TaskItem task={mockTask} />
      </Provider>
    );
    
    expect(screen.getByTestId('toggle-task')).toBeInTheDocument();
    expect(screen.getByTestId('delete-task-button')).toBeInTheDocument();
  });
});

describe('FilterTasks Component', () => {
  test('renders filter buttons', () => {
    render(
      <Provider store={createTestStore()}>
        <FilterTasks />
      </Provider>
    );
    
    expect(screen.getByTestId('filter-all')).toBeInTheDocument();
    expect(screen.getByTestId('filter-active')).toBeInTheDocument();
    expect(screen.getByTestId('filter-completed')).toBeInTheDocument();
  });

  test('displays task counts', () => {
    render(
      <Provider store={createTestStore()}>
        <FilterTasks />
      </Provider>
    );
    
    expect(screen.getByTestId('active-count')).toHaveTextContent('1 active');
    expect(screen.getByTestId('completed-count')).toHaveTextContent('0 completed');
  });
});