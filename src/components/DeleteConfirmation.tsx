import React from 'react';
import { useDispatch } from 'react-redux';
import { AlertTriangle } from 'lucide-react';
import { deleteTask } from '../store/taskSlice';
import { motion } from 'framer-motion';

interface DeleteConfirmationProps {
  taskId: string;
  taskTitle: string;
  onClose: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  taskId,
  taskTitle,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(taskId));
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
      data-testid="delete-confirmation-modal"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-[90%] shadow-xl"
      >
        <div className="flex items-center mb-4 text-warning-500">
          <AlertTriangle size={24} />
          <h3 className="text-lg font-semibold ml-2">Confirm Deletion</h3>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete "<span className="font-medium">{taskTitle}</span>"? 
          This action cannot be undone.
        </p>
        
        <div className="flex justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            data-testid="cancel-delete"
          >
            Cancel
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="px-4 py-2 rounded-md text-white bg-error-500 hover:bg-red-600 transition-colors"
            data-testid="confirm-delete"
          >
            Delete
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmation;