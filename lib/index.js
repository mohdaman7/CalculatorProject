// Re-export apiService as default
export { apiService as default } from './api';

// Export individual services if needed
export { default as authService } from './api/services/AuthService';
export { default as calculatorService } from './api/services/CalculatorService';
