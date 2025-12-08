const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class VerificationService {
  async requestOTP(phoneNumber) {
    try {
      const response = await fetch(`${API_BASE_URL}/verification/request-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error requesting OTP:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  async verifyOTP(phoneNumber, otp) {
    try {
      const response = await fetch(`${API_BASE_URL}/verification/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  async checkVerification(phoneNumber) {
    try {
      const response = await fetch(`${API_BASE_URL}/verification/check-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking verification:', error);
      return {
        isVerified: false
      };
    }
  }

  async addPhoneToWhitelist(phoneNumber, token, description = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/verification/whitelist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ phoneNumber, description }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding phone to whitelist:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }

  async removePhoneFromWhitelist(phoneNumber, token) {
    try {
      const response = await fetch(`${API_BASE_URL}/verification/whitelist/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error removing phone from whitelist:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }

  async getWhitelistedPhones(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/verification/whitelist`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching whitelist:', error);
      return {
        success: false,
        count: 0,
        phones: []
      };
    }
  }

  isVerified() {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('calculator_token');
    const user = localStorage.getItem('user');
    
    return !!(token && user);
  }

  getStoredPhone() {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.phoneNumber;
      } catch {
        return null;
      }
    }
    return null;
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('calculator_token');
      localStorage.removeItem('user');
    }
  }
}

export const verificationService = new VerificationService();
