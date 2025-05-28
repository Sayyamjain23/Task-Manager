import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusCircle, Repeat } from 'lucide-react';
import { addTask } from '../store/taskSlice';
import { motion } from 'framer-motion';
import VoiceInput from './VoiceInput';

const AddTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [recurrence, setRecurrence] = useState<'daily' | 'weekly' | 'monthly' | null>(null);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim()) {
      dispatch(addTask({ title: title.trim(), recurrence }));
      setTitle('');
      setRecurrence(null);
    }
  };

  const handleVoiceInput = (transcript: string) => {
    setTitle(transcript);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full mb-6"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-primary-500">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 bg-transparent border-none focus:outline-none p-1"
              data-testid="add-task-input"
            />
            <VoiceInput onTranscript={handleVoiceInput} />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-lg shadow-sm transition-colors duration-200 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            data-testid="add-task-button"
            disabled={!title.trim()}
          >
            <PlusCircle size={20} />
            <span className="hidden sm:inline">Add Task</span>
          </motion.button>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Repeat size={16} />
            Repeat:
          </span>
          {(['daily', 'weekly', 'monthly'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRecurrence(recurrence === option ? null : option)}
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize transition-colors ${
                recurrence === option
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </form>
    </motion.div>
  );
}

export default AddTask