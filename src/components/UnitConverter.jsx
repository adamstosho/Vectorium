import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft } from 'lucide-react';
import { useCalculator } from '../context/CalculatorContext';

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const { playClickSound } = useCalculator();

  const units = {
    length: {
      m: { name: 'Meters', factor: 1 },
      cm: { name: 'Centimeters', factor: 100 },
      km: { name: 'Kilometers', factor: 0.001 },
      in: { name: 'Inches', factor: 39.3701 },
      ft: { name: 'Feet', factor: 3.28084 },
      mi: { name: 'Miles', factor: 0.000621371 }
    },
    weight: {
      kg: { name: 'Kilograms', factor: 1 },
      g: { name: 'Grams', factor: 1000 },
      lb: { name: 'Pounds', factor: 2.20462 },
      oz: { name: 'Ounces', factor: 35.274 }
    },
    temperature: {
      c: { name: 'Celsius', factor: 1 },
      f: { name: 'Fahrenheit', factor: 1 },
      k: { name: 'Kelvin', factor: 1 }
    },
    volume: {
      l: { name: 'Liters', factor: 1 },
      ml: { name: 'Milliliters', factor: 1000 },
      gal: { name: 'Gallons', factor: 0.264172 },
      qt: { name: 'Quarts', factor: 1.05669 },
      pt: { name: 'Pints', factor: 2.11338 },
      cup: { name: 'Cups', factor: 4.22675 }
    }
  };

  useEffect(() => {
    // Set default units when category changes
    const unitKeys = Object.keys(units[category]);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1] || unitKeys[0]);
    setFromValue('');
    setToValue('');
  }, [category]);

  const convertTemperature = (value, from, to) => {
    let celsius;
    
    // Convert to Celsius first
    switch (from) {
      case 'c':
        celsius = value;
        break;
      case 'f':
        celsius = (value - 32) * 5/9;
        break;
      case 'k':
        celsius = value - 273.15;
        break;
      default:
        return 0;
    }
    
    
    switch (to) {
      case 'c':
        return celsius;
      case 'f':
        return celsius * 9/5 + 32;
      case 'k':
        return celsius + 273.15;
      default:
        return 0;
    }
  };

  const convert = (value, from, to, cat) => {
    if (!value || isNaN(value)) return '';
    
    const numValue = parseFloat(value);
    
    if (cat === 'temperature') {
      return convertTemperature(numValue, from, to).toFixed(6).replace(/\.?0+$/, '');
    }
    
    const fromFactor = units[cat][from].factor;
    const toFactor = units[cat][to].factor;
    const result = (numValue / fromFactor) * toFactor;
    
    return result.toFixed(6).replace(/\.?0+$/, '');
  };

  const handleFromValueChange = (value) => {
    setFromValue(value);
    setToValue(convert(value, fromUnit, toUnit, category));
  };

  const handleToValueChange = (value) => {
    setToValue(value);
    setFromValue(convert(value, toUnit, fromUnit, category));
  };

  const swapUnits = () => {
    playClickSound();
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Unit Converter</h3>
      
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {Object.keys(units).map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playClickSound();
              setCategory(cat);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              category === cat
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Conversion Interface */}
      <div className="space-y-4">
        {/* From Unit */}
        <div className="space-y-2">
          <select
            value={fromUnit}
            onChange={(e) => {
              setFromUnit(e.target.value);
              setToValue(convert(fromValue, e.target.value, toUnit, category));
            }}
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          >
            {Object.entries(units[category]).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={fromValue}
            onChange={(e) => handleFromValueChange(e.target.value)}
            placeholder="Enter value"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={swapUnits}
            className="p-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/25 transition-colors duration-200"
          >
            <ArrowRightLeft size={20} />
          </motion.button>
        </div>

        {/* To Unit */}
        <div className="space-y-2">
          <select
            value={toUnit}
            onChange={(e) => {
              setToUnit(e.target.value);
              setToValue(convert(fromValue, fromUnit, e.target.value, category));
            }}
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          >
            {Object.entries(units[category]).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={toValue}
            onChange={(e) => handleToValueChange(e.target.value)}
            placeholder="Result"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-secondary-500/50"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default UnitConverter;