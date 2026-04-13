// const ADMIN_API = 'https://api.epiccalculator.in/api';
// const VENDOR_API =
//   process.env.NEXT_PUBLIC_API_URL || 'https://vendor.epiccalculator.in/api';

// class VerificationService {
//   // ✅ ONLY whitelist check (Admin backend)
//   async isWhitelisted(phoneNumber, countryCode = '+91') {
//     try {
//       const normalized = phoneNumber.replace(/\D/g, '').slice(-10);

//       const res = await fetch(`${ADMIN_API}/phone-numbers/verify`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           phoneNumber: normalized,
//           countryCode
//         })
//       });

//       const data = await res.json();
//       return !!(data.success && data.whitelisted);
//     } catch (err) {
//       console.error('Whitelist check failed:', err);
//       return false;
//     }
//   }

//   // ✅ Vendor backend login after Firebase verification
//   async loginWithFirebase(firebaseToken) {
//     try {
//       const res = await fetch(`${VENDOR_API}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ firebaseToken })
//       });

//       return await res.json();
//     } catch (err) {
//       console.error('Vendor login failed:', err);
//       return { success: false };
//     }
//   }

//   isVerified() {
//     if (typeof window === 'undefined') return false;
//     return !!localStorage.getItem('calculator_token');
//   }

//   logout() {
//     localStorage.removeItem('calculator_token');
//     localStorage.removeItem('user');
//   }
// }

// export const verificationService = new VerificationService();





const ADMIN_API = 'https://api.epiccalculator.in/api';
export const VENDOR_API = process.env.NEXT_PUBLIC_API_URL || 'https://vendor.epiccalculator.in/api';

class VerificationService {
  /* ================= OTP (Firebase handles it) ================= */

  async requestOTP(phoneNumber) {
    return { success: true }; // Firebase already sent OTP
  }

  async verifyOTP(phoneNumber, otp) {
    return { success: true }; // Firebase verifies OTP
  }

  /* ================= ADMIN WHITELIST CHECK ================= */

  async isWhitelisted(phoneNumber, countryCode = '+91') {
    try {
      const normalized = phoneNumber.replace(/\D/g, '').slice(-10);

      const res = await fetch(
        `${ADMIN_API}/phone-numbers/verify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumber: normalized,
            countryCode
          })
        }
      );

      const data = await res.json();
      return data.success && data.whitelisted;
    } catch (err) {
      console.error('Whitelist check failed:', err);
      return false;
    }
  }

  /* ================= SESSION HELPERS ================= */

  async requestEmailOTP(email) {
    try {
      const res = await fetch(`${VENDOR_API}/auth/request-email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (err) {
      console.error('Email OTP request failed:', err);
      return { success: false, error: 'Failed to request code' };
    }
  }

  async verifyEmailOTP(email, otp) {
    try {
      const res = await fetch(`${VENDOR_API}/auth/verify-email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      return await res.json();
    } catch (err) {
      console.error('Email OTP verification failed:', err);
      return { success: false, error: 'Failed to verify code' };
    }
  }

  /* ================= DIRECT LOGIN ================= */

  async directEmailLogin(email) {
    try {
      const res = await fetch(`${VENDOR_API}/auth/direct-email-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (err) {
      console.error('Direct email login failed:', err);
      return { success: false, error: 'Failed to log in directly' };
    }
  }

  /* ================= SESSION HELPERS ================= */

  isVerified() {
    return !!safeStorage.getItem('user');
  }

  getStoredUser() {
    const user = safeStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getStoredPhone() {
    const user = this.getStoredUser();
    return user ? user.phoneNumber : null;
  }

  logout() {
    safeStorage.removeItem('user');
    safeStorage.removeItem('calculator_token');
  }
}

export const verificationService = new VerificationService();

