const PhoneVerification = require('../models/PhoneVerification');
const AllowedPhoneNumber = require('../models/AllowedPhoneNumber');
const twilio = require('twilio');

class VerificationService {
  constructor() {
    // Initialize Twilio client if credentials are provided
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      this.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
      console.log('Twilio SMS service initialized');
    } else {
      this.twilioClient = null;
      console.log('Twilio not configured - OTP will be logged to console');
    }
  }

  // Send SMS via Twilio
  async sendSMS(phoneNumber, message) {
    if (!this.twilioClient) {
      console.log(`[SMS MOCK] To: ${phoneNumber} | Message: ${message}`);
      return { success: true, mock: true };
    }

    try {
      // Format phone number for Twilio (needs country code)
      let formattedPhone = phoneNumber.replace(/\D/g, '');
      if (formattedPhone.length === 10) {
        formattedPhone = '+91' + formattedPhone; // Default to India, change as needed
      } else if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone;
      }

      const result = await this.twilioClient.messages.create({
        body: message,
        from: this.twilioPhoneNumber,
        to: formattedPhone
      });

      console.log(`[SMS SENT] To: ${formattedPhone} | SID: ${result.sid}`);
      return { success: true, sid: result.sid };
    } catch (error) {
      console.error('[SMS ERROR]', error.message);
      return { success: false, error: error.message };
    }
  }
  // Generate 6-digit OTP
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Check if phone number is in whitelist
  async isPhoneNumberAllowed(phoneNumber) {
    try {
      const allowed = await AllowedPhoneNumber.findOne({
        phoneNumber: this.normalizePhoneNumber(phoneNumber),
        isActive: true
      });
      return !!allowed;
    } catch (error) {
      console.error('Error checking allowed phone number:', error);
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
      // Check if phone is allowed
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
      const smsResult = await this.sendSMS(
        phoneNumber, 
        `Your verification code is: ${otp}. Valid for 10 minutes.`
      );
      
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

      // Update allowed phone number's lastUsedAt
      await AllowedPhoneNumber.updateOne(
        { phoneNumber: normalizedPhone },
        { lastUsedAt: new Date() }
      );

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

  // Add phone to whitelist (Admin only)
  async addPhoneToWhitelist(phoneNumber, description = '') {
    try {
      const normalizedPhone = this.normalizePhoneNumber(phoneNumber);

      const allowed = new AllowedPhoneNumber({
        phoneNumber: normalizedPhone,
        description,
        addedBy: 'admin'
      });

      await allowed.save();

      return {
        success: true,
        message: 'Phone number added to whitelist successfully',
        phoneNumber: normalizedPhone
      };
    } catch (error) {
      if (error.code === 11000) {
        return {
          success: false,
          message: 'Phone number already in whitelist'
        };
      }
      console.error('Error adding phone to whitelist:', error);
      return {
        success: false,
        message: 'Failed to add phone number to whitelist'
      };
    }
  }

  // Remove phone from whitelist (Admin only)
  async removePhoneFromWhitelist(phoneNumber) {
    try {
      const normalizedPhone = this.normalizePhoneNumber(phoneNumber);

      const result = await AllowedPhoneNumber.deleteOne({
        phoneNumber: normalizedPhone
      });

      return {
        success: result.deletedCount > 0,
        message: result.deletedCount > 0 
          ? 'Phone number removed from whitelist'
          : 'Phone number not found in whitelist'
      };
    } catch (error) {
      console.error('Error removing phone from whitelist:', error);
      return {
        success: false,
        message: 'Failed to remove phone number from whitelist'
      };
    }
  }

  // Get all allowed phones (Admin only)
  async getAllowedPhones() {
    try {
      const phones = await AllowedPhoneNumber.find({ isActive: true })
        .sort({ createdAt: -1 });
      return {
        success: true,
        count: phones.length,
        phones
      };
    } catch (error) {
      console.error('Error fetching allowed phones:', error);
      return {
        success: false,
        message: 'Failed to fetch allowed phones'
      };
    }
  }
}

module.exports = new VerificationService();
