const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User with this email or username already exists'
      });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        forcedNumber: user.forcedNumber,
        secondForceNumber: user.secondForceNumber,
        secondForceTriggerNumber: user.secondForceTriggerNumber,
        birthYear: user.birthYear,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        forcedNumber: user.forcedNumber,
        secondForceNumber: user.secondForceNumber,
        secondForceTriggerNumber: user.secondForceTriggerNumber,
        birthYear: user.birthYear,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        firebaseUid: req.user.firebaseUid,
        username: req.user.username,
        phoneNumber: req.user.phoneNumber,
        isAdmin: req.user.isAdmin,
        isSuperAdmin: !!req.user.isSuperAdmin,
        forcedNumber: req.user.forcedNumber,
        secondForceNumber: req.user.secondForceNumber,
        secondForceTriggerNumber: req.user.secondForceTriggerNumber,
        birthYear: req.user.birthYear,
        preferences: req.user.preferences
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update birth year
router.put('/birth-year', auth, async (req, res) => {
  try {
    const { birthYear } = req.body;

    if (birthYear !== undefined && birthYear !== null) {
      const currentYear = new Date().getFullYear();
      if (birthYear < 1900 || birthYear > currentYear) {
        return res.status(400).json({
          error: 'Birth year must be between 1900 and current year'
        });
      }
      req.user.birthYear = birthYear;
    }

    await req.user.save();

    // Calculate age
    const currentYear = new Date().getFullYear();
    const calculatedAge = req.user.birthYear ? currentYear - req.user.birthYear : null;

    res.json({
      message: 'Birth year updated successfully',
      birthYear: req.user.birthYear,
      age: calculatedAge
    });
  } catch (error) {
    console.error('Update birth year error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update forced number
router.put('/forced-number', auth, async (req, res) => {
  try {
    const { forcedNumber, secondForceNumber, secondForceTriggerNumber } = req.body;

    if (forcedNumber !== undefined) req.user.forcedNumber = forcedNumber;
    if (secondForceNumber !== undefined) req.user.secondForceNumber = secondForceNumber;
    if (secondForceTriggerNumber !== undefined) req.user.secondForceTriggerNumber = secondForceTriggerNumber;

    await req.user.save();

    res.json({
      message: 'Forced numbers updated successfully',
      forcedNumber: req.user.forcedNumber,
      secondForceNumber: req.user.secondForceNumber,
      secondForceTriggerNumber: req.user.secondForceTriggerNumber
    });
  } catch (error) {
    console.error('Update forced number error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
