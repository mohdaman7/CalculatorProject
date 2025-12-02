import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('calculator_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle token expiration (401) and avoid infinite retry loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Here you can add token refresh logic if needed
        // const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
        //   refreshToken: getRefreshToken()
        // });
        // const { token } = response.data;
        // localStorage.setItem('calculator_token', token);
        // originalRequest.headers.Authorization = `Bearer ${token}`;
        // return axiosInstance(originalRequest);
      } catch (error) {
        // If refresh fails, clear auth and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('calculator_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
