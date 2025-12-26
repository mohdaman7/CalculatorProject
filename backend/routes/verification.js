const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const WhitelistedPhone = require('../models/WhitelistedPhone');
const VerificationService = require('../services/VerificationService');
const auth = require('../middleware/auth');

const router = express.Router();

// Get current user info
router.get('/me', auth, async (req, res) => {
  try {
    const isSuper = VerificationService.isSuperAdmin(req.user.phoneNumber);
    res.status(200).json({
      success: true,
      user: {
        phoneNumber: req.user.phoneNumber,
        isAdmin: req.user.isAdmin,
        isSuperAdmin: isSuper
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

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

    // Check if this number is pre-authorized as admin in the whitelist
    const whitelisted = await WhitelistedPhone.findOne({ phoneNumber: normalizedPhone });
    const shouldBeAdmin = whitelisted ? whitelisted.isAdminRequested : false;

    let user = await User.findOne({ phoneNumber: normalizedPhone });

    if (!user) {
      // Create new user with phone number
      user = new User({
        username: `user_${normalizedPhone}`,
        email: `${normalizedPhone}@calculator.local`,
        phoneNumber: normalizedPhone,
        isPhoneVerified: true,
        isAdmin: shouldBeAdmin
      });

      await user.save();
    } else {
      // Update existing user
      user.isPhoneVerified = true;
      // Also update admin status if requested in whitelist
      if (shouldBeAdmin) {
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

// Check if phone is whitelisted (for frontend enforcement)
router.post('/is-whitelisted', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const isAllowed = await VerificationService.isPhoneNumberAllowed(phoneNumber);

    res.status(200).json({
      phoneNumber: VerificationService.maskPhoneNumber(phoneNumber),
      isAllowed
    });
  } catch (error) {
    console.error('Check whitelist error:', error);
    res.status(500).json({ error: 'Server error' });
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

// Whitelist management (Admin only)

// Get all whitelisted phones
router.get('/whitelist', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    const whitelistedPhones = await WhitelistedPhone.find().populate('addedBy', 'username');
    res.status(200).json({
      success: true,
      count: whitelistedPhones.length,
      phones: whitelistedPhones
    });
  } catch (error) {
    console.error('Get whitelist error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a phone to whitelist
router.post('/whitelist/add', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    const { phoneNumber, description, isAdminRequested } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const normalizedPhone = VerificationService.normalizePhoneNumber(phoneNumber).slice(-10);

    // Only super admin can set isAdminRequested
    const isRequesterSuperAdmin = VerificationService.isSuperAdmin(req.user.phoneNumber);
    const finalIsAdminRequested = isRequesterSuperAdmin ? !!isAdminRequested : false;

    // Check if already exists
    const existing = await WhitelistedPhone.findOne({ phoneNumber: normalizedPhone });
    if (existing) {
      return res.status(400).json({ error: 'Phone number already whitelisted' });
    }

    const whiteListEntry = new WhitelistedPhone({
      phoneNumber: normalizedPhone,
      description,
      isAdminRequested: finalIsAdminRequested,
      addedBy: req.user._id
    });

    await whiteListEntry.save();

    res.status(201).json({
      success: true,
      message: 'Phone number added to whitelist',
      data: whiteListEntry
    });
  } catch (error) {
    console.error('Add whitelist error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove a phone from whitelist
router.delete('/whitelist/remove', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const normalizedPhone = VerificationService.normalizePhoneNumber(phoneNumber).slice(-10);

    const result = await WhitelistedPhone.findOneAndDelete({ phoneNumber: normalizedPhone });

    if (!result) {
      return res.status(404).json({ error: 'Phone number not found in whitelist' });
    }

    res.status(200).json({
      success: true,
      message: 'Phone number removed from whitelist'
    });
  } catch (error) {
    console.error('Remove whitelist error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Toggle admin status for a whitelisted phone
router.post('/whitelist/toggle-admin', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    // Only super admin can toggle roles
    if (!VerificationService.isSuperAdmin(req.user.phoneNumber)) {
      return res.status(403).json({ error: 'Access denied. Only Super Admin can manage roles.' });
    }

    const { phoneNumber, isAdminRequested } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const normalizedPhone = VerificationService.normalizePhoneNumber(phoneNumber).slice(-10);

    const whitelistEntry = await WhitelistedPhone.findOneAndUpdate(
      { phoneNumber: normalizedPhone },
      { isAdminRequested: !!isAdminRequested },
      { new: true }
    );

    if (!whitelistEntry) {
      return res.status(404).json({ error: 'Phone number not found in whitelist' });
    }

    // Also update the User model if the user already exists
    await User.findOneAndUpdate(
      { phoneNumber: { $regex: normalizedPhone + '$' } },
      { isAdmin: !!isAdminRequested }
    );

    res.status(200).json({
      success: true,
      message: `Admin status ${isAdminRequested ? 'granted' : 'revoked'}`,
      data: whitelistEntry
    });
  } catch (error) {
    console.error('Toggle admin error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
