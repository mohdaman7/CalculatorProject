import BaseService from './BaseService';

class CalculatorService extends BaseService {
  constructor() {
    super('/calculator');
  }

  async saveCalculation(calculationData) {
    try {
      const response = await this.request({
        method: 'POST',
        url: '/history',
        data: calculationData
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getHistory(params = {}) {
    try {
      const response = await this.request({
        method: 'GET',
        url: '/history',
        params
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default new CalculatorService();
