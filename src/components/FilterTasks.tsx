import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/taskSlice';
import { RootState } from '../store';
import { TaskFilter } from '../types';
import { motion } from 'framer-motion';

const FilterTasks: React.FC = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  
  const filters: { label: string; value: TaskFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex space-x-2">
          {filters.map(filter => (
            <motion.button
              key={filter.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setFilter(filter.value))}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                currentFilter === filter.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              data-testid={`filter-${filter.value}`}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-3">
          <span data-testid="active-count">{activeCount} active</span>
          <span data-testid="completed-count">{completedCount} completed</span>
        </div>
      </div>
    </div>
  );
};

export default FilterTasks;