const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const VerificationService = require('../services/VerificationService');

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

    // Request OTP (checks external admin API for allowed phones)
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

    if (!user) {
      // Create new user with phone number
      user = new User({
        username: `user_${normalizedPhone}`,
        email: `${normalizedPhone}@calculator.local`,
        phoneNumber: normalizedPhone,
        isPhoneVerified: true
      });

      await user.save();
    } else {
      // Update existing user
      user.isPhoneVerified = true;
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
