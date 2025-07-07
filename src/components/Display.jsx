import React from 'react';
import { motion } from 'framer-motion';
import { useCalculator } from '../context/CalculatorContext';

const Display = () => {
  const { display } = useCalculator();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20 dark:border-gray-700/50"
    >
      <div className="text-right">
        <motion.div
          key={display}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          className="text-4xl md:text-5xl font-light text-gray-800 dark:text-white font-mono min-h-[3rem] flex items-center justify-end overflow-hidden"
        >
          {display}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Display;