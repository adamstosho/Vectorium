import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Display from '../components/Display';
import Keypad from '../components/Keypad';
import ModeToggle from '../components/ModeToggle';
import HistoryPanel from '../components/HistoryPanel';
import UnitConverter from '../components/UnitConverter';
import EquationSolver from '../components/EquationSolver';
import GraphPlotter from '../components/GraphPlotter';

const Calculator = () => {
  const [activeTab, setActiveTab] = useState('calculator');

  const tabs = [
    { id: 'calculator', label: 'Calculator', icon: '🧮' },
    { id: 'converter', label: 'Converter', icon: '🔄' },
    { id: 'solver', label: 'Solver', icon: '📐' },
    { id: 'graph', label: 'Graph', icon: '📊' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'calculator':
        return (
          <div className="space-y-6">
            <Display />
            <Keypad />
          </div>
        );
      case 'converter':
        return <UnitConverter />;
      case 'solver':
        return <EquationSolver />;
      case 'graph':
        return <GraphPlotter />;
      default:
        return (
          <div className="space-y-6">
            <Display />
            <Keypad />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Vectorium
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
            An Advanced Scientific, Graphing & Unit Converter Calculator
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <HistoryPanel />
            <ModeToggle />
          </div>
        </motion.header>

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center mb-8"
        >
          <div className="inline-flex bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-1 border border-white/30 dark:border-gray-700/50">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        
        <motion.main
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {renderContent()}
        </motion.main>

        
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-500 dark:text-gray-400"
        >
          <p>Built by ART_Redox @DLT_Africa </p>
          <p className="mt-1 text-sm">Press keyboard keys for quick input</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Calculator;