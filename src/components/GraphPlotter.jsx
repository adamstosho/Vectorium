import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { evaluate } from 'mathjs';
import { useCalculator } from '../context/CalculatorContext';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphPlotter = () => {
  const [equation, setEquation] = useState('x^2');
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const { playClickSound } = useCalculator();
  const { theme } = useTheme();

  const plotGraph = () => {
    playClickSound();
    
    if (!equation.trim()) return;

    try {
      setError('');
      const points = [];
      const labels = [];
      const step = (xMax - xMin) / 200; 

      for (let x = xMin; x <= xMax; x += step) {
        try {
          
          const expr = equation.replace(/x/g, `(${x})`);
          const y = evaluate(expr);
          
          if (isFinite(y)) {
            points.push({ x: x, y: y });
            labels.push(x.toFixed(2));
          }
        } catch (e) {
          
        }
      }

      if (points.length === 0) {
        throw new Error('No valid points generated');
      }

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: `y = ${equation}`,
            data: points.map(p => p.y),
            borderColor: theme === 'dark' ? '#3B82F6' : '#2563EB',
            backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
        ],
      };

      setData(chartData);
    } catch (err) {
      setError('Invalid equation. Please check your syntax.');
      setData(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      plotGraph();
    }
  };

  const exampleEquations = [
    'x^2',
    'sin(x)',
    'cos(x)',
    'x^3 - 2*x',
    'sqrt(x)',
    'log(x)',
    '2*x + 1'
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: theme === 'dark' ? '#E5E7EB' : '#374151'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
        titleColor: theme === 'dark' ? '#E5E7EB' : '#374151',
        bodyColor: theme === 'dark' ? '#E5E7EB' : '#374151',
        borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'x',
          color: theme === 'dark' ? '#E5E7EB' : '#374151'
        },
        grid: {
          color: theme === 'dark' ? '#374151' : '#E5E7EB'
        },
        ticks: {
          color: theme === 'dark' ? '#E5E7EB' : '#374151'
        }
      },
      y: {
        title: {
          display: true,
          text: 'y',
          color: theme === 'dark' ? '#E5E7EB' : '#374151'
        },
        grid: {
          color: theme === 'dark' ? '#374151' : '#E5E7EB'
        },
        ticks: {
          color: theme === 'dark' ? '#E5E7EB' : '#374151'
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  
  useEffect(() => {
    plotGraph();
  }, [theme]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50"
    >
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="text-primary-500" size={24} />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Graph Plotter</h3>
      </div>

      
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Equation (use x as variable)
            </label>
            <input
              type="text"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., x^2, sin(x), 2*x + 1"
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                X Min
              </label>
              <input
                type="number"
                value={xMin}
                onChange={(e) => setXMin(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                X Max
              </label>
              <input
                type="number"
                value={xMax}
                onChange={(e) => setXMax(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={plotGraph}
          className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg shadow-primary-500/25"
        >
          Plot Graph
        </motion.button>
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

      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4"
        >
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </motion.div>
      )}

      
      {data && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          style={{ height: '400px' }}
        >
          <Line data={data} options={chartOptions} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default GraphPlotter;