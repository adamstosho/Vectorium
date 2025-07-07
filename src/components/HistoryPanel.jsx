import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, X, Trash2 } from 'lucide-react';
import { useCalculator } from '../context/CalculatorContext';

const HistoryPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { history, clearHistory, playClickSound } = useCalculator();

  const togglePanel = () => {
    playClickSound();
    setIsOpen(!isOpen);
  };

  const handleClearHistory = () => {
    playClickSound();
    clearHistory();
  };

  return (
    <>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePanel}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg shadow-secondary-500/25 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500/50"
      >
        <History size={20} />
      </motion.button>

      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={togglePanel}
          />
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl z-50 border-l border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex flex-col h-full">
              
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">History</h2>
                <div className="flex items-center space-x-2">
                  {history.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClearHistory}
                      className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePanel}
                    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors duration-200"
                  >
                    <X size={16} />
                  </motion.button>
                </div>
              </div>

              
              <div className="flex-1 overflow-y-auto p-4">
                {history.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    <p>No calculations yet</p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    {history.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50"
                      >
                        <div className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {item.expression}
                        </div>
                        <div className="font-mono text-lg font-semibold text-gray-800 dark:text-white">
                          = {item.result}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          {item.timestamp}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HistoryPanel;