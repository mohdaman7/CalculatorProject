const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = null;
    this.loadToken();
  }

  loadToken() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('calculator_token');
    }
  }

  saveToken(token) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('calculator_token', token);
    }
  }

  removeToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('calculator_token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    this.saveToken(data.token);
    return data;
  }

  async login(credentials) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.saveToken(data.token);
    return data;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateForcedNumber(forcedNumber) {
    return this.request('/auth/forced-number', {
      method: 'PUT',
      body: JSON.stringify({ forcedNumber }),
    });
  }

  // Calculator endpoints
  async saveCalculation(calculationData) {
    return this.request('/calculator/history', {
      method: 'POST',
      body: JSON.stringify(calculationData),
    });
  }

  async getHistory(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/calculator/history?${queryString}`);
  }

  async clearHistory(deviceId) {
    const params = deviceId ? { deviceId } : {};
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/calculator/history?${queryString}`, {
      method: 'DELETE',
    });
  }

  async syncCalculations(calculations) {
    return this.request('/calculator/sync', {
      method: 'POST',
      body: JSON.stringify({ calculations }),
    });
  }

  async getStats() {
    return this.request('/calculator/stats');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Logout
  logout() {
    this.removeToken();
  }
}

export const apiService = new ApiService();
