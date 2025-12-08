const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const VerificationService = require('../services/VerificationService');
const auth = require('../middleware/auth');

const router = express.Router();

// Request OTP for phone number
router.post('/request-otp', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Validate phone number format
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Request OTP
    const result = await VerificationService.requestOTP(phoneNumber);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: result.message,
        phoneNumber: result.phoneNumber,
        expiresIn: result.expiresIn
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.message
      });
    }
  } catch (error) {
    console.error('Request OTP error:', error);
    res.status(500).json({ error: 'Server error during OTP request' });
  }
});

// Verify OTP and get auth token
router.post('/verify-otp', async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    if (otp.length !== 6 || isNaN(otp)) {
      return res.status(400).json({ error: 'Invalid OTP format' });
    }

    // Verify OTP
    const verificationResult = await VerificationService.verifyOTP(phoneNumber, otp);

    if (!verificationResult.success) {
      return res.status(400).json({
        success: false,
        error: verificationResult.message
      });
    }

    // Check if user exists
    const normalizedPhone = VerificationService.normalizePhoneNumber(phoneNumber);
    let user = await User.findOne({ phoneNumber: normalizedPhone });

    // Check if this phone is an admin phone
    const adminPhones = (process.env.ADMIN_PHONE_NUMBERS || '').split(',').map(p => p.trim()).filter(Boolean);
    const isAdminPhone = adminPhones.some(adminPhone => {
      const normalizedAdmin = VerificationService.normalizePhoneNumber(adminPhone);
      return normalizedAdmin === normalizedPhone;
    });

    if (!user) {
      // Create new user with phone number
      user = new User({
        username: `user_${normalizedPhone}`,
        email: `${normalizedPhone}@calculator.local`,
        phoneNumber: normalizedPhone,
        isPhoneVerified: true,
        isAdmin: isAdminPhone
      });

      await user.save();
    } else {
      // Update existing user
      user.isPhoneVerified = true;
      if (isAdminPhone && !user.isAdmin) {
        user.isAdmin = true;
      }
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Phone verification successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isPhoneVerified: user.isPhoneVerified,
        isAdmin: user.isAdmin,
        forcedNumber: user.forcedNumber,
        secondForceNumber: user.secondForceNumber,
        secondForceTriggerNumber: user.secondForceTriggerNumber,
        birthYear: user.birthYear,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Server error during OTP verification' });
  }
});

// Admin: Add phone to whitelist
router.post('/whitelist/add', auth, async (req, res) => {
  try {
    // Check if user is admin (optional - implement your admin check)
    const { phoneNumber, description } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const result = await VerificationService.addPhoneToWhitelist(phoneNumber, description);

    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Add phone to whitelist error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Remove phone from whitelist
router.delete('/whitelist/remove', auth, async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const result = await VerificationService.removePhoneFromWhitelist(phoneNumber);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Remove phone from whitelist error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Get all whitelisted phones
router.get('/whitelist', auth, async (req, res) => {
  try {
    const result = await VerificationService.getAllowedPhones();

    res.status(200).json(result);
  } catch (error) {
    console.error('Get whitelist error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Setup: Initialize admin phone numbers (one-time setup)
router.post('/setup-admin', async (req, res) => {
  try {
    const { setupKey } = req.body;
    
    // Verify setup key from environment
    const envSetupKey = process.env.ADMIN_SETUP_KEY || 'setup123';
    if (setupKey !== envSetupKey) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid setup key' 
      });
    }

    // Get admin phone numbers from environment
    const adminPhones = (process.env.ADMIN_PHONE_NUMBERS || '')
      .split(',')
      .map(p => p.trim())
      .filter(Boolean);

    if (adminPhones.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No ADMIN_PHONE_NUMBERS configured in environment'
      });
    }

    const results = [];
    
    for (const phone of adminPhones) {
      const normalizedPhone = VerificationService.normalizePhoneNumber(phone);
      
      // Add to whitelist
      const whitelistResult = await VerificationService.addPhoneToWhitelist(
        normalizedPhone,
        'System Administrator'
      );
      
      results.push({
        phone: normalizedPhone,
        whitelisted: whitelistResult.success || whitelistResult.message.includes('already'),
        message: whitelistResult.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Admin setup completed',
      results
    });
  } catch (error) {
    console.error('Admin setup error:', error);
    res.status(500).json({ error: 'Server error during admin setup' });
  }
});

// Check if phone is verified (for frontend)
router.post('/check-verification', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const isVerified = await VerificationService.isPhoneVerifiedRecently(phoneNumber);

    res.status(200).json({
      phoneNumber: VerificationService.maskPhoneNumber(phoneNumber),
      isVerified
    });
  } catch (error) {
    console.error('Check verification error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
