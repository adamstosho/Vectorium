import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { evaluate, parse, simplify } from 'mathjs';
import { useCalculator } from '../context/CalculatorContext';

const EquationSolver = () => {
  const [equation, setEquation] = useState('');
  const [solution, setSolution] = useState('');
  const [steps, setSteps] = useState([]);
  const { playClickSound, addToHistory } = useCalculator();

  const solveEquation = () => {
    playClickSound();
    
    if (!equation.trim()) return;

    try {
      
      if (equation.includes('=')) {
        const [left, right] = equation.split('=').map(s => s.trim());
        
        
        const leftExpr = left.replace(/x/g, '*x');
        const rightExpr = right.replace(/x/g, '*x');
        
        
        if (left.includes('x') && !right.includes('x')) {
          const rightValue = evaluate(right);
          
          
          let coefficient = 0;
          let constant = 0;
          
          
          const terms = leftExpr.split(/\+|\-/);
          const operators = leftExpr.match(/[\+\-]/g) || [];
          
          for (let i = 0; i < terms.length; i++) {
            const term = terms[i].trim();
            const sign = i === 0 ? 1 : (operators[i-1] === '+' ? 1 : -1);
            
            if (term.includes('x')) {
              const coeff = term.replace('*x', '').replace('x', '') || '1';
              coefficient += sign * parseFloat(coeff === '' ? '1' : coeff);
            } else if (term !== '') {
              constant += sign * parseFloat(term);
            }
          }
          
          if (coefficient !== 0) {
            const x = (rightValue - constant) / coefficient;
            setSolution(`x = ${x}`);
            setSteps([
              `Original equation: ${equation}`,
              `Rearrange: ${coefficient}x = ${rightValue} - (${constant})`,
              `Simplify: ${coefficient}x = ${rightValue - constant}`,
              `Divide by ${coefficient}: x = ${(rightValue - constant)} / ${coefficient}`,
              `Solution: x = ${x}`
            ]);
            
            
            if (typeof addToHistory === 'function') {
              addToHistory({
                expression: equation,
                result: `x = ${x}`
              });
            }
            return;
          }
        }
      }
      
      
      const result = evaluate(equation);
      setSolution(result.toString());
      setSteps([
        `Expression: ${equation}`,
        `Result: ${result}`
      ]);
      
      if (typeof addToHistory === 'function') {
        addToHistory({
          expression: equation,
          result: result
        });
      }
      
    } catch (error) {
      setSolution('Error: Invalid equation or expression');
      setSteps(['Please check your equation format']);
    }
  };

  const clearEquation = () => {
    playClickSound();
    setEquation('');
    setSolution('');
    setSteps([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      solveEquation();
    }
  };

  const exampleEquations = [
    '2x + 5 = 13',
    '3x - 7 = 14',
    'x/2 + 3 = 8',
    '2*x + 4*x = 18'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Calculator className="text-primary-500" size={24} />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Equation Solver</h3>
      </div>

      
      <div className="space-y-4 mb-6">
        <div className="relative">
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter equation (e.g., 2x + 5 = 13)"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={solveEquation}
            className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg shadow-primary-500/25"
          >
            Solve
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearEquation}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            Clear
          </motion.button>
        </div>
      </div>

      
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick examples:</p>
        <div className="flex flex-wrap gap-2">
          {exampleEquations.map((ex, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playClickSound();
                setEquation(ex);
              }}
              className="px-3 py-1 text-sm bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-900/50 transition-colors duration-200"
            >
              {ex}
            </motion.button>
          ))}
        </div>
      </div>

      
      {solution && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4 mb-4"
        >
          <h4 className="font-semibold text-accent-700 dark:text-accent-300 mb-2">Solution:</h4>
          <p className="text-lg font-mono text-accent-800 dark:text-accent-200">{solution}</p>
        </motion.div>
      )}

      
      {steps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
        >
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Steps:</h4>
          <ol className="space-y-1">
            {steps.map((step, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EquationSolver;