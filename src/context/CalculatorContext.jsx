import React, { createContext, useContext, useState, useCallback } from 'react';
import { evaluate } from 'mathjs';

const CalculatorContext = createContext();

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};

export const CalculatorProvider = ({ children }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNumber, setWaitingForNumber] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('calculator-history');
    return saved ? JSON.parse(saved) : [];
  });

  const playClickSound = useCallback(() => {
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      
      console.log('Audio not supported');
    }
  }, []);

  const addToHistory = useCallback((calculation) => {
    const newHistory = [{
      id: Date.now(),
      expression: calculation.expression,
      result: calculation.result,
      timestamp: new Date().toLocaleString()
    }, ...history].slice(0, 100); 
    
    setHistory(newHistory);
    localStorage.setItem('calculator-history', JSON.stringify(newHistory));
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('calculator-history');
  }, []);

  const inputNumber = useCallback((num) => {
    playClickSound();
    if (waitingForNumber) {
      setDisplay(String(num));
      setWaitingForNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  }, [display, waitingForNumber, playClickSound]);

  const inputDot = useCallback(() => {
    playClickSound();
    if (waitingForNumber) {
      setDisplay('0.');
      setWaitingForNumber(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForNumber, playClickSound]);

  const clear = useCallback(() => {
    playClickSound();
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNumber(false);
  }, [playClickSound]);

  const performOperation = useCallback((nextOperation) => {
    playClickSound();
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let result;

      try {
        switch (operation) {
          case '+':
            result = currentValue + inputValue;
            break;
          case '-':
            result = currentValue - inputValue;
            break;
          case '*':
            result = currentValue * inputValue;
            break;
          case '/':
            result = inputValue !== 0 ? currentValue / inputValue : 'Error';
            break;
          case '^':
            result = Math.pow(currentValue, inputValue);
            break;
          default:
            return;
        }

        if (result !== 'Error') {
          const calculation = {
            expression: `${currentValue} ${operation} ${inputValue}`,
            result: result
          };
          addToHistory(calculation);
        }

        setDisplay(String(result));
        setPreviousValue(result);
      } catch (error) {
        setDisplay('Error');
        setPreviousValue(null);
      }
    }

    setWaitingForNumber(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation, playClickSound, addToHistory]);

  const calculate = useCallback(() => {
    playClickSound();
    if (operation && previousValue !== null) {
      performOperation(null);
      setOperation(null);
      setPreviousValue(null);
      setWaitingForNumber(true);
    }
  }, [operation, previousValue, performOperation, playClickSound]);

  const performFunction = useCallback((func) => {
    playClickSound();
    const value = parseFloat(display);
    let result;

    try {
      switch (func) {
        case 'sqrt':
          result = Math.sqrt(value);
          break;
        case 'sin':
          result = Math.sin(value * Math.PI / 180);
          break;
        case 'cos':
          result = Math.cos(value * Math.PI / 180);
          break;
        case 'tan':
          result = Math.tan(value * Math.PI / 180);
          break;
        case 'log':
          result = Math.log10(value);
          break;
        case 'ln':
          result = Math.log(value);
          break;
        case 'factorial':
          result = value >= 0 && value <= 170 && value % 1 === 0 ? 
            Array.from({length: value}, (_, i) => i + 1).reduce((a, b) => a * b, 1) : 'Error';
          break;
        case 'pi':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        default:
          return;
      }

      const calculation = {
        expression: `${func}(${value})`,
        result: result
      };
      addToHistory(calculation);

      setDisplay(String(result));
      setWaitingForNumber(true);
    } catch (error) {
      setDisplay('Error');
    }
  }, [display, playClickSound, addToHistory]);

  const evaluateExpression = useCallback((expression) => {
    try {
      const result = evaluate(expression);
      const calculation = {
        expression: expression,
        result: result
      };
      addToHistory(calculation);
      return result;
    } catch (error) {
      return 'Error';
    }
  }, [addToHistory]);

  return (
    <CalculatorContext.Provider value={{
      display,
      history,
      inputNumber,
      inputDot,
      clear,
      performOperation,
      calculate,
      performFunction,
      evaluateExpression,
      clearHistory,
      playClickSound
    }}>
      {children}
    </CalculatorContext.Provider>
  );
};