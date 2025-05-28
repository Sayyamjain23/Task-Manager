import React from 'react';
import { CheckSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 py-4 px-6 shadow-sm mb-8 sticky top-0 z-10"
    >
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <CheckSquare className="text-primary-500 mr-2" size={28} />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">TaskFlow</h1>
        </div>
        
        <ThemeToggle />
      </div>
    </motion.header>
  );
};

export default Header;