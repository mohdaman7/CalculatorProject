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

  async getCurrentUser(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/verification/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      if (API_BASE_URL.includes('localhost') && typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        return { success: false, error: 'Production frontend cannot connect to localhost backend. Please check NEXT_PUBLIC_API_URL settings.' };
      }
      return { success: false, error: 'Failed to fetch user profile' };
    }
  }

  async isWhitelisted(phoneNumber, countryCode = '+91') {
    try {
      const normalized = phoneNumber.replace(/\D/g, '').slice(-10);
      
      const response = await fetch(`${API_BASE_URL}/verification/is-whitelisted`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: normalized, countryCode }),
      });

      const data = await response.json();
      return !!(data.isAllowed || data.whitelisted);
    } catch (error) {
      console.error('Error checking whitelist:', error);
      return false;
    }
  }

  isVerified() {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('calculator_token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const userData = JSON.parse(user);
        return !!(userData.uid || userData.phoneNumber);
      } catch {
        return false;
      }
    }
    return false;
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
