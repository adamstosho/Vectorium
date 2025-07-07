import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CalculatorProvider } from './context/CalculatorContext';
import Calculator from './pages/Calculator';

function App() {
  return (
    <ThemeProvider>
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    </ThemeProvider>
  );
}

export default App;