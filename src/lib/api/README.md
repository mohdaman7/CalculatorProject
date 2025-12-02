# API Services

This directory contains the API service layer for the application, built with Axios for making HTTP requests. The services are organized in a modular way to promote reusability and maintainability.

## Structure

```
src/lib/api/
├── config/
│   └── axios.config.js    # Axios instance configuration
├── services/
│   ├── BaseService.js     # Base service class with common CRUD operations
│   ├── AuthService.js     # Authentication related API calls
│   └── CalculatorService.js # Calculator specific API calls
└── index.js              # Exports all services
```

## Available Services

### AuthService
Handles all authentication related API calls.

```javascript
import { authService } from '@/lib/api';

// Register a new user
const register = async (username, email, password) => {
  try {
    const data = await authService.register({ username, email, password });
    // Handle successful registration
  } catch (error) {
    // Handle error
  }
};

// Login user
const login = async (email, password) => {
  try {
    const data = await authService.login({ email, password });
    // Handle successful login
  } catch (error) {
    // Handle error
  }
};

// Get current user
const getCurrentUser = async () => {
  try {
    const data = await authService.getCurrentUser();
    // Use user data
  } catch (error) {
    // Handle error
  }
};

// Logout
const logout = () => {
  authService.logout();
};

// Check if user is authenticated
const isAuthenticated = authService.isAuthenticated();
```

### CalculatorService
Handles calculator specific API calls.

```javascript
import { calculatorService } from '@/lib/api';

// Save calculation
const saveCalculation = async (calculationData) => {
  try {
    const data = await calculatorService.saveCalculation(calculationData);
    // Handle success
  } catch (error) {
    // Handle error
  }
};

// Get calculation history
const getHistory = async (params = {}) => {
  try {
    const data = await calculatorService.getHistory(params);
    // Use history data
  } catch (error) {
    // Handle error
  }
};
```

## Error Handling

All services extend the BaseService which provides consistent error handling. Errors are logged to the console and re-thrown to be handled by the calling code.

## Configuration

The Axios instance is configured in `axios.config.js` with:
- Base URL from environment variables
- Automatic JWT token handling
- Request/response interceptors for common tasks
- Error handling for authentication failures

## Adding a New Service

1. Create a new file in the `services` directory
2. Extend the `BaseService` class
3. Implement service-specific methods
4. Add the service to `index.js`

Example:

```javascript
// services/NewService.js
import BaseService from './BaseService';

class NewService extends BaseService {
  constructor() {
    super('/api-endpoint');
  }

  async customMethod(params) {
    return this.request({
      method: 'GET',
      url: '/custom',
      params
    });
  }
}

export default new NewService();
```

## Best Practices

1. Use the service layer for all API calls
2. Keep components free of direct API calls
3. Handle loading and error states in the UI
4. Use TypeScript for better type safety (recommended)
5. Add JSDoc comments for service methods
