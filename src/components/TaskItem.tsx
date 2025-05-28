import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CheckCircle, Circle, Trash2, Repeat, Share2 } from 'lucide-react';
import { toggleTask } from '../store/taskSlice';
import { Task } from '../types';
import DeleteConfirmation from './DeleteConfirmation';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'TaskFlow Task',
          text: `Task: ${task.title}${task.recurrence ? ` (Repeats ${task.recurrence})` : ''}`,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(task.title);
        alert('Task copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing task:', error);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <motion.li
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={`flex items-center justify-between p-3 mb-2 rounded-lg ${
          task.completed 
            ? 'bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' 
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        } border shadow-sm hover:shadow-md transition-all`}
        data-testid="task-item"
      >
        <div className="flex items-center flex-1 min-w-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggle}
            className={`mr-3 focus:outline-none ${
              task.completed ? 'text-success-500' : 'text-gray-400 dark:text-gray-500'
            }`}
            data-testid="toggle-task"
          >
            {task.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
          </motion.button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p 
                className={`text-sm sm:text-base font-medium ${
                  task.completed 
                    ? 'text-gray-500 dark:text-gray-400 line-through' 
                    : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                {task.title}
              </p>
              {task.recurrence && (
                <Repeat
                  size={16}
                  className="text-primary-500"
                  title={`Repeats ${task.recurrence}`}
                />
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {formatDate(task.createdAt)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="text-gray-400 hover:text-primary-500 dark:text-gray-500 dark:hover:text-primary-500 focus:outline-none transition-colors"
            title="Share task"
          >
            <Share2 size={18} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowDeleteConfirmation(true)}
            className="text-gray-400 hover:text-error-500 dark:text-gray-500 dark:hover:text-error-500 focus:outline-none transition-colors"
            data-testid="delete-task-button"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </motion.li>

      {showDeleteConfirmation && (
        <DeleteConfirmation
          taskId={task.id}
          taskTitle={task.title}
          onClose={() => setShowDeleteConfirmation(false)}
        />
      )}
    </>
  );
};

export default TaskItem;