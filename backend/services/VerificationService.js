const PhoneVerification = require('../models/PhoneVerification');

// External Admin API URL
const EXTERNAL_ADMIN_API = process.env.EXTERNAL_ADMIN_API || 'https://artofmentalism.bloombizsuite.com/api';

class VerificationService {
  constructor() {
    // Check for Fast2SMS (preferred for India)
    if (process.env.FAST2SMS_API_KEY) {
      this.smsProvider = 'fast2sms';
      this.fast2smsApiKey = process.env.FAST2SMS_API_KEY;
      console.log('Fast2SMS service initialized');
    }
    // Check for Twilio (international)
    else if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      const twilio = require('twilio');
      this.smsProvider = 'twilio';
      this.twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      this.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
      console.log('Twilio SMS service initialized');
    } else {
      this.smsProvider = 'console';
      console.log('No SMS provider configured - OTP will be logged to console');
    }
    console.log('External Admin API:', EXTERNAL_ADMIN_API);
  }

  // Send SMS via Fast2SMS (OTP Route)
  async sendFast2SMS(phoneNumber, otp) {
    try {
      // Format phone number (10 digits only for Fast2SMS)
      const formattedPhone = phoneNumber.replace(/\D/g, '').slice(-10);
      
      // Build URL with query parameters (GET method)
      const params = new URLSearchParams({
        authorization: this.fast2smsApiKey,
        route: 'otp',
        variables_values: otp,
        flash: '0',
        numbers: formattedPhone
      });
      
      const url = `https://www.fast2sms.com/dev/bulkV2?${params.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET'
      });

      const data = await response.json();
      
      if (data.return === true) {
        console.log(`[Fast2SMS] OTP sent to ${formattedPhone} | Request ID: ${data.request_id}`);
        return { success: true, requestId: data.request_id };
      } else {
        console.error('[Fast2SMS Error]', data.message || data);
        return { success: false, error: data.message || 'Failed to send OTP' };
      }
    } catch (error) {
      console.error('[Fast2SMS Error]', error.message);
      return { success: false, error: error.message };
    }
  }

  // Send SMS via Twilio
  async sendTwilioSMS(phoneNumber, message) {
    try {
      // Format phone number for Twilio (needs country code)
      let formattedPhone = phoneNumber.replace(/\D/g, '');
      if (formattedPhone.length === 10) {
        formattedPhone = '+91' + formattedPhone; // Default to India
      } else if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone;
      }

      const result = await this.twilioClient.messages.create({
        body: message,
        from: this.twilioPhoneNumber,
        to: formattedPhone
      });

      console.log(`[Twilio] SMS sent to ${formattedPhone} | SID: ${result.sid}`);
      return { success: true, sid: result.sid };
    } catch (error) {
      console.error('[Twilio Error]', error.message);
      return { success: false, error: error.message };
    }
  }

  // Send SMS (auto-selects provider)
  async sendSMS(phoneNumber, otp) {
    const message = `Your AOM Force verification code is: ${otp}. Valid for 10 minutes.`;
    
    switch (this.smsProvider) {
      case 'fast2sms':
        return await this.sendFast2SMS(phoneNumber, otp);
      case 'twilio':
        return await this.sendTwilioSMS(phoneNumber, message);
      default:
        // Console logging for development
        console.log(`\n========================================`);
        console.log(`[OTP] Phone: ${phoneNumber}`);
        console.log(`[OTP] Code: ${otp}`);
        console.log(`========================================\n`);
        return { success: true, mock: true };
    }
  }

  // Generate 6-digit OTP
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Check if phone number is allowed via external admin API
  async isPhoneNumberAllowed(phoneNumber) {
    try {
      const normalizedPhone = this.normalizePhoneNumber(phoneNumber);
      
      console.log('[EXTERNAL API] Checking phone:', normalizedPhone);
      console.log('[EXTERNAL API] URL:', `${EXTERNAL_ADMIN_API}/check-phone`);
      
      const response = await fetch(`${EXTERNAL_ADMIN_API}/check-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ phone: normalizedPhone }),
      });

      console.log('[EXTERNAL API] HTTP Status:', response.status);
      
      const data = await response.json();
      console.log('[EXTERNAL API] Response:', JSON.stringify(data));
      
      if (data.exists === true) {
        console.log('[EXTERNAL API] Phone is registered');
        return true;
      }
      
      console.log('[EXTERNAL API] Phone is NOT registered');
      return false;
    } catch (error) {
      console.error('[EXTERNAL API] Error:', error.message);
      return false;
    }
  }

  // Normalize phone number (remove special characters)
  normalizePhoneNumber(phoneNumber) {
    return phoneNumber.replace(/\D/g, '').slice(-10); // Keep last 10 digits
  }

  // Request OTP for phone number
  async requestOTP(phoneNumber) {
    try {
      // Check if phone is allowed via external admin
      const isAllowed = await this.isPhoneNumberAllowed(phoneNumber);
      if (!isAllowed) {
        return {
          success: false,
          message: 'This phone number is not registered. Please contact administrator.'
        };
      }

      // Generate OTP
      const otp = this.generateOTP();
      
      // Send OTP via SMS
      const smsResult = await this.sendSMS(phoneNumber, otp);
      
      if (!smsResult.success && !smsResult.mock) {
        return {
          success: false,
          message: 'Failed to send OTP. Please try again.'
        };
      }

      // Delete any existing unverified OTPs for this number
      await PhoneVerification.deleteMany({
        phoneNumber: this.normalizePhoneNumber(phoneNumber),
        isVerified: false
      });

      // Save new OTP record
      const verification = new PhoneVerification({
        phoneNumber: this.normalizePhoneNumber(phoneNumber),
        otp
      });

      await verification.save();

      return {
        success: true,
        message: 'OTP sent successfully. Please check your SMS.',
        phoneNumber: this.maskPhoneNumber(phoneNumber),
        expiresIn: 600 // 10 minutes in seconds
      };
    } catch (error) {
      console.error('Error requesting OTP:', error);
      return {
        success: false,
        message: 'Failed to request OTP. Please try again.'
      };
    }
  }

  // Verify OTP
  async verifyOTP(phoneNumber, otp) {
    try {
      const normalizedPhone = this.normalizePhoneNumber(phoneNumber);

      // Find the verification record
      const verification = await PhoneVerification.findOne({
        phoneNumber: normalizedPhone,
        isVerified: false
      }).sort({ createdAt: -1 });

      if (!verification) {
        return {
          success: false,
          message: 'No OTP found. Please request a new one.'
        };
      }

      // Check expiry
      if (new Date() > verification.expiresAt) {
        await PhoneVerification.deleteOne({ _id: verification._id });
        return {
          success: false,
          message: 'OTP expired. Please request a new one.'
        };
      }

      // Check attempts
      if (verification.attempts >= verification.maxAttempts) {
        await PhoneVerification.deleteOne({ _id: verification._id });
        return {
          success: false,
          message: 'Maximum attempts exceeded. Please request a new OTP.'
        };
      }

      // Verify OTP
      if (verification.otp !== otp) {
        verification.attempts += 1;
        await verification.save();
        return {
          success: false,
          message: `Invalid OTP. Attempts remaining: ${verification.maxAttempts - verification.attempts}`
        };
      }

      // Mark as verified
      verification.isVerified = true;
      await verification.save();

      return {
        success: true,
        message: 'Phone number verified successfully!',
        phoneNumber: normalizedPhone
      };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return {
        success: false,
        message: 'Error verifying OTP. Please try again.'
      };
    }
  }

  // Mask phone number for display
  maskPhoneNumber(phoneNumber) {
    const normalized = this.normalizePhoneNumber(phoneNumber);
    return normalized.slice(0, -4).replace(/\d/g, '*') + normalized.slice(-4);
  }

  // Check if phone is verified (within last session)
  async isPhoneVerifiedRecently(phoneNumber, withinMinutes = 30) {
    try {
      const normalizedPhone = this.normalizePhoneNumber(phoneNumber);
      const cutoffTime = new Date(Date.now() - withinMinutes * 60 * 1000);

      const verification = await PhoneVerification.findOne({
        phoneNumber: normalizedPhone,
        isVerified: true,
        updatedAt: { $gte: cutoffTime }
      });

      return !!verification;
    } catch (error) {
      console.error('Error checking recent verification:', error);
      return false;
    }
  }
}

module.exports = new VerificationService();
