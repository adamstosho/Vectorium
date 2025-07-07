import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCalculator } from '../context/CalculatorContext';

const Button = ({ children, onClick, className = '', type = 'default', size = 'normal', ...props }) => {
  const baseClasses = "relative font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 select-none";
  
  const sizeClasses = {
    normal: "h-14 rounded-xl text-lg",
    tall: "h-[7.5rem] rounded-xl text-xl",
    wide: "col-span-2 h-14 rounded-xl text-lg"
  };

  const typeClasses = {
    number: `
      bg-white dark:bg-gray-800 
      hover:bg-gray-50 dark:hover:bg-gray-700
      text-gray-900 dark:text-white 
      border border-gray-200 dark:border-gray-600
      shadow-sm hover:shadow-md
      active:scale-[0.98]
    `,
    operator: `
      bg-blue-500 dark:bg-blue-600
      hover:bg-blue-600 dark:hover:bg-blue-500
      text-white font-semibold
      shadow-sm hover:shadow-md
      active:scale-[0.98]
      border-0
    `,
    function: `
      bg-gray-100 dark:bg-gray-700
      hover:bg-gray-200 dark:hover:bg-gray-600
      text-gray-700 dark:text-gray-200 font-medium
      border border-gray-200 dark:border-gray-600
      shadow-sm hover:shadow-md
      active:scale-[0.98]
    `,
    equals: `
      bg-orange-500 dark:bg-orange-600
      hover:bg-orange-600 dark:hover:bg-orange-500
      text-white font-semibold
      shadow-sm hover:shadow-md
      active:scale-[0.98]
      border-0
    `,
    clear: `
      bg-red-500 dark:bg-red-600
      hover:bg-red-600 dark:hover:bg-red-500
      text-white font-semibold
      shadow-sm hover:shadow-md
      active:scale-[0.98]
      border-0
    `
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${sizeClasses[size]} ${typeClasses[type]} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="flex items-center justify-center h-full">
        {children}
      </span>
    </motion.button>
  );
};

const Keypad = () => {
  const { inputNumber, inputDot, clear, performOperation, calculate, performFunction } = useCalculator();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      event.preventDefault();

      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        inputDot();
      } else if (key === '+') {
        performOperation('+');
      } else if (key === '-') {
        performOperation('-');
      } else if (key === '*') {
        performOperation('*');
      } else if (key === '/') {
        performOperation('/');
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputNumber, inputDot, clear, performOperation, calculate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-4 gap-3 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50"
    >
      
       <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={clear} type="clear" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full">
          AC
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => performFunction('sqrt')} type="function" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-full">
          √
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => performOperation('^')} type="function" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-full">
          x²
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => performOperation('/')} type="operator" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-full">
          ÷
        </Button>
      </motion.div>

      {/* Row 2 */}
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => performFunction('sin')} type="function" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-full">
          sin
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => performFunction('cos')} type="function" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-full">
          cos
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => performFunction('tan')} type="function" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-full">
          tan
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => performOperation('*')} type="operator" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-full">
          ×
        </Button>
      </motion.div>

      {/* Row 3 */}
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => inputNumber('7')} type="number" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full">
          7
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => inputNumber('8')} type="number" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full">
          8
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => inputNumber('9')} type="number" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full">
          9
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => performOperation('-')} type="operator" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-full">
          −
        </Button>
      </motion.div>

      {/* Row 4 */}
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => inputNumber('4')} type="number" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full">
          4
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => inputNumber('5')} type="number" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full">
          5
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => inputNumber('6')} type="number" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full">
          6
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="row-span-2">
        <Button onClick={() => performOperation('+')} type="operator" size="tall" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-full h-full">
          +
        </Button>
      </motion.div>

      {/* Row 5 */}
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => inputNumber('1')} type="number" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full">
          1
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => inputNumber('2')} type="number" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full">
          2
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => inputNumber('3')} type="number" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full">
          3
        </Button>
      </motion.div>

      {/* Row 6 */}
      <motion.div variants={itemVariants} className="col-span-2">
        <Button onClick={() => inputNumber('0')} type="number" size="wide" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full">
          0
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={inputDot} type="number" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full">
          .
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={calculate} type="equals" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full">
          =
        </Button>
      </motion.div>

      {/* Row 7 */}
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => performFunction('log')} type="function" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-full">
          log
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => performFunction('ln')} type="function" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-full">
          ln
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => performFunction('pi')} type="function" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-full">
          π
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-1">
        <Button onClick={() => performFunction('e')} type="function" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-full">
          e
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Keypad;