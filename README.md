# Advanced Calculator Web App

A comprehensive, production-ready calculator application built with React.js, featuring scientific calculations, unit conversion, equation solving, and interactive graphing capabilities.

## 🚀 Features

### 🧮 Scientific Calculator
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Scientific Functions**: sin, cos, tan, log, ln, square root, power, factorial
- **Constants**: π (pi), e (Euler's number)
- **Advanced Features**: Parentheses support, memory functions
- **Keyboard Support**: Full keyboard input support
- **Sound Feedback**: Subtle click sounds for better user experience

### 📊 Interactive Graph Plotter
- Plot mathematical functions (e.g., x², sin(x), cos(x))
- Adjustable X-axis range
- Smooth, responsive charts using Chart.js
- Dark mode compatible
- Real-time plotting with 200+ data points for smooth curves

### 🔄 Multi-Unit Converter
- **Length**: Meters, centimeters, inches, feet, kilometers, miles
- **Weight**: Kilograms, grams, pounds, ounces
- **Temperature**: Celsius, Fahrenheit, Kelvin
- **Volume**: Liters, milliliters, gallons, quarts, pints, cups
- Bidirectional conversion with swap functionality

### 📐 Equation Solver
- Solve linear equations (e.g., 2x + 5 = 13)
- Step-by-step solution breakdown
- Support for basic algebraic expressions
- Quick example equations for testing

### 📝 Calculation History
- Persistent storage using localStorage
- Complete calculation history with timestamps
- Clear individual or all history entries
- Elegant slide-out panel interface

### 🎨 Design & UX
- **Dark/Light Mode**: System preference detection with manual toggle
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Glassmorphism UI**: Modern frosted glass aesthetic
- **Smooth Animations**: Powered by Framer Motion
- **Accessibility**: ARIA labels, keyboard navigation, focus indicators

## 🛠️ Technology Stack

- **Frontend**: React.js 18 with Hooks
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Charts**: Chart.js with React-ChartJS-2
- **Math**: Math.js for expression parsing and evaluation
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd advanced-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎯 Usage Guide

### Calculator Mode
- Use number buttons or keyboard input
- Click operators or use keyboard shortcuts (+, -, *, /, =, Enter)
- Access scientific functions via dedicated buttons
- Press 'C' or Escape to clear

### Unit Converter
- Select category (Length, Weight, Temperature, Volume)
- Choose source and target units
- Enter value in either field for instant conversion
- Use swap button to reverse conversion direction

### Equation Solver
- Enter linear equations in format: `2x + 5 = 13`
- Click "Solve" or press Enter
- View step-by-step solution process
- Try provided examples for quick testing

### Graph Plotter
- Enter mathematical expressions using x as variable
- Examples: `x^2`, `sin(x)`, `2*x + 1`, `sqrt(x)`
- Adjust X-axis range as needed
- Graph updates automatically with smooth curves

## 🎨 Customization

### Color System
The app uses a comprehensive color system defined in `tailwind.config.js`:
- **Primary**: Blue shades for main actions
- **Secondary**: Purple shades for scientific functions
- **Accent**: Green shades for special operations
- **Status Colors**: Success, warning, error states

### Theme System
Toggle between light and dark modes with automatic system preference detection. Themes persist across sessions using localStorage.

### Adding New Features
1. Create new components in `src/components/`
2. Add to main navigation in `src/pages/Calculator.jsx`
3. Extend context providers as needed
4. Follow existing animation patterns for consistency

## 📱 Browser Support

- Chrome/Chromium 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔧 Development Notes

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Display.jsx     # Calculator display
│   ├── Keypad.jsx      # Button grid
│   ├── ModeToggle.jsx  # Theme switcher
│   ├── HistoryPanel.jsx # Calculation history
│   ├── UnitConverter.jsx # Unit conversion
│   ├── EquationSolver.jsx # Equation solving
│   └── GraphPlotter.jsx # Function graphing
├── context/            # React context providers
│   ├── ThemeContext.jsx # Theme management
│   └── CalculatorContext.jsx # Calculator state
├── pages/              # Main page components
│   └── Calculator.jsx  # Main app layout
├── App.jsx            # Root component
└── main.jsx           # Entry point
```

### Performance Optimizations
- Component lazy loading for large features
- Memoized calculations to prevent unnecessary re-renders
- Optimized chart rendering with reduced data points
- LocalStorage debouncing for history updates

### Testing
Run the linter to check code quality:
```bash
npm run lint
```

## 🚀 Deployment

The app is ready for deployment to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

Build the production bundle:
```bash
npm run build
```

The `dist/` folder contains all files needed for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow existing code style and patterns
4. Add comprehensive comments for complex logic
5. Test across different browsers and devices
6. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Chart.js for beautiful, responsive charts
- Math.js for robust mathematical expression parsing
- Framer Motion for smooth, performant animations
- Tailwind CSS for rapid, maintainable styling
- Lucide React for clean, consistent icons

---

**Built with ❤️ using React.js, Tailwind CSS, and modern web technologies.**