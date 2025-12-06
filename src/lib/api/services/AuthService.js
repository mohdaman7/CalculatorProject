import BaseService from './BaseService';
import axiosInstance from '../config/axios.config';

class AuthService extends BaseService {
  constructor() {
    super('/auth');
  }

  async register(userData) {
    try {
      const response = await axiosInstance.post(`${this.endpoint}/register`, userData);
      if (response.data.token) {
        this.saveToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async login(credentials) {
    try {
      const response = await axiosInstance.post(`${this.endpoint}/login`, credentials);
      if (response.data.token) {
        this.saveToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCurrentUser() {
    try {
      const response = await axiosInstance.get(`${this.endpoint}/me`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateForcedNumber(forcedNumbers) {
    try {
      const response = await axiosInstance.put(`${this.endpoint}/forced-number`, forcedNumbers);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateBirthYear(birthYear) {
    try {
      const response = await axiosInstance.put(`${this.endpoint}/birth-year`, { birthYear });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  logout() {
    this.removeToken();
  }

  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('calculator_token');
  }

  saveToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('calculator_token', token);
      // Update the default Authorization header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('calculator_token');
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  }
}

export default new AuthService();
