import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TaskItem from './TaskItem';
import { Task } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { FileX } from 'lucide-react';

const TaskList: React.FC = () => {
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // Sort tasks by creation date (newest first)
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => b.createdAt - a.createdAt);
  }, [filteredTasks]);

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <FileX className="mx-auto text-gray-400 dark:text-gray-500 mb-3" size={48} />
        <p className="text-gray-500 dark:text-gray-400">No tasks yet. Add your first task above!</p>
      </motion.div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <p className="text-gray-500 dark:text-gray-400">
          {filter === 'active' 
            ? 'No active tasks found.' 
            : 'No completed tasks found.'}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-6"
    >
      <AnimatePresence>
        <ul data-testid="task-list">
          {sortedTasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;