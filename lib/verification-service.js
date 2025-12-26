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

  async addPhoneToWhitelist(phoneNumber, token, description = '', isAdminRequested = false) {
    try {
      const response = await fetch(`${API_BASE_URL}/verification/whitelist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ phoneNumber, description, isAdminRequested }),
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
      const errorMsg = (API_BASE_URL.includes('localhost') && typeof window !== 'undefined' && window.location.hostname !== 'localhost')
        ? 'Backend not found. Production frontend cannot hit localhost.'
        : 'Failed to fetch whitelist';
      return {
        success: false,
        error: errorMsg,
        count: 0,
        phones: []
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

  async updateWhitelistedPhone(oldPhoneNumber, newPhoneNumber, token, description = '', isAdminRequested = false) {
    try {
      const response = await fetch(`${API_BASE_URL}/verification/whitelist/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ oldPhoneNumber, newPhoneNumber, description, isAdminRequested }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating whitelisted phone:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }

  async isWhitelisted(phoneNumber) {
    try {
      // Super admin bypass
      const normalized = phoneNumber.replace(/\D/g, '').slice(-10);
      if (normalized === '9999999999' || normalized === '7736904372') return true;

      const response = await fetch(`${API_BASE_URL}/verification/is-whitelisted`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      return !!data.isAllowed;
    } catch (error) {
      console.error('Error checking whitelist:', error);
      return false;
    }
  }

  async toggleAdminStatus(phoneNumber, token, isAdminRequested) {
    try {
      const response = await fetch(`${API_BASE_URL}/verification/whitelist/toggle-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ phoneNumber, isAdminRequested }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error toggling admin status:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }

  isAdmin() {
    if (typeof window === 'undefined') return false;
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        // Explicit bypass for known admin numbers for reliability
        const phone = userData.phoneNumber ? userData.phoneNumber.replace(/\D/g, '').slice(-10) : '';
        if (phone === '9999999999' || phone === '7736904372') return true;

        return !!userData.isAdmin;
      } catch {
        return false;
      }
    }
    return false;
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
