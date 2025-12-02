import axiosInstance from '../config/axios.config';

class BaseService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  // Create a new resource
  async create(data) {
    try {
      const response = await axiosInstance.post(this.endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get all resources with optional query parameters
  async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(this.endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get a single resource by ID
  async getById(id) {
    try {
      const response = await axiosInstance.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Update a resource by ID
  async update(id, data) {
    try {
      const response = await axiosInstance.put(`${this.endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Delete a resource by ID
  async delete(id) {
    try {
      const response = await axiosInstance.delete(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Custom request method for non-CRUD operations
  async request(config) {
    try {
      const response = await axiosInstance({
        ...config,
        url: `${this.endpoint}${config.url || ''}`,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Handle API errors consistently
  handleError(error) {
    console.error('API Error:', error);
    
    // You can add more sophisticated error handling here
    const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
    
    // You could also integrate with a global error handling system here
    // e.g., show a toast notification
    
    throw new Error(errorMessage);
  }
}

export default BaseService;
