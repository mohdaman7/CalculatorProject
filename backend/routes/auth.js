// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // Register user
// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({
//       $or: [{ email }, { username }]
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         error: 'User with this email or username already exists'
//       });
//     }

//     // Create new user
//     const user = new User({ username, email, password });
//     await user.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRE }
//     );

//     res.status(201).json({
//       message: 'User registered successfully',
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         forcedNumber: user.forcedNumber,
//         secondForceNumber: user.secondForceNumber,
//         secondForceTriggerNumber: user.secondForceTriggerNumber,
//         birthYear: user.birthYear,
//         preferences: user.preferences
//       }
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ error: 'Server error during registration' });
//   }
// });

// // Login user
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     // Check password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRE }
//     );

//     res.json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         forcedNumber: user.forcedNumber,
//         secondForceNumber: user.secondForceNumber,
//         secondForceTriggerNumber: user.secondForceTriggerNumber,
//         birthYear: user.birthYear,
//         preferences: user.preferences
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Server error during login' });
//   }
// });

// // Get current user
// router.get('/me', auth, async (req, res) => {
//   try {
//     res.json({
//       user: {
//         id: req.user._id,
//         firebaseUid: req.user.firebaseUid,
//         username: req.user.username,
//         phoneNumber: req.user.phoneNumber,
//         forcedNumber: req.user.forcedNumber,
//         secondForceNumber: req.user.secondForceNumber,
//         secondForceTriggerNumber: req.user.secondForceTriggerNumber,
//         birthYear: req.user.birthYear,
//         preferences: req.user.preferences
//       }
//     });
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Update birth year
// router.put('/birth-year', auth, async (req, res) => {
//   try {
//     const { birthYear } = req.body;

//     if (birthYear !== undefined && birthYear !== null) {
//       const currentYear = new Date().getFullYear();
//       if (birthYear < 1900 || birthYear > currentYear) {
//         return res.status(400).json({
//           error: 'Birth year must be between 1900 and current year'
//         });
//       }
//       req.user.birthYear = birthYear;
//     }

//     await req.user.save();

//     // Calculate age
//     const currentYear = new Date().getFullYear();
//     const calculatedAge = req.user.birthYear ? currentYear - req.user.birthYear : null;

//     res.json({
//       message: 'Birth year updated successfully',
//       birthYear: req.user.birthYear,
//       age: calculatedAge
//     });
//   } catch (error) {
//     console.error('Update birth year error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Update forced number
// router.put('/forced-number', auth, async (req, res) => {
//   try {
//     const { forcedNumber, secondForceNumber, secondForceTriggerNumber } = req.body;

//     if (forcedNumber !== undefined) req.user.forcedNumber = forcedNumber;
//     if (secondForceNumber !== undefined) req.user.secondForceNumber = secondForceNumber;
//     if (secondForceTriggerNumber !== undefined) req.user.secondForceTriggerNumber = secondForceTriggerNumber;

//     await req.user.save();

//     res.json({
//       message: 'Forced numbers updated successfully',
//       forcedNumber: req.user.forcedNumber,
//       secondForceNumber: req.user.secondForceNumber,
//       secondForceTriggerNumber: req.user.secondForceTriggerNumber
//     });
//   } catch (error) {
//     console.error('Update forced number error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;





const express = require('express');
const jwt = require('jsonwebtoken');
const admin = require('../config/firebase');
const User = require('../models/User');
const EmailOTP = require('../models/EmailOTP');
const EmailService = require('../services/EmailService');

const router = express.Router();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request Email OTP
router.post('/request-email-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    const otp = generateOTP();

    // Save OTP to database
    await EmailOTP.findOneAndUpdate(
      { email: email.toLowerCase() },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Send OTP via email
    const emailResult = await EmailService.sendOTP(email, otp);

    if (!emailResult.success) {
      return res.status(500).json({ success: false, error: 'Failed to send OTP email' });
    }

    res.json({ success: true, message: 'OTP sent successfully to your email' });
  } catch (err) {
    console.error('Request Email OTP error:', err);
    res.status(500).json({ success: false, error: 'Server error during OTP request' });
  }
});

// Verify Email OTP
router.post('/verify-email-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'Email and OTP are required' });
    }

    const otpRecord = await EmailOTP.findOne({
      email: email.toLowerCase(),
      otp: otp
    });

    if (!otpRecord) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }

    // OTP is valid, delete it
    await EmailOTP.deleteOne({ _id: otpRecord._id });

    // Find or create user
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await User.create({
        email: email.toLowerCase(),
        username: `user_${email.split('@')[0]}_${Math.floor(1000 + Math.random() * 9000)}`,
        isPhoneVerified: false, // verified via email instead
        uid: `email_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      token,
      user
    });
  } catch (err) {
    console.error('Verify Email OTP error:', err);
    res.status(500).json({ success: false, error: 'Server error during OTP verification' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { firebaseToken } = req.body;
    if (!firebaseToken) {
      return res.status(400).json({ success: false, error: 'Token required' });
    }

    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    const phoneNumber = decoded.phone_number
      ?.replace(/\D/g, '')
      .slice(-10);

    if (!phoneNumber) {
      return res.status(400).json({ success: false, error: 'Invalid token' });
    }

    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = await User.create({
        phoneNumber,
        firebaseUid: decoded.uid,
        isPhoneVerified: true
      });
    } else {
      user.isPhoneVerified = true;
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      token,
      user
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, error: 'Auth failed' });
  }
});

module.exports = router;
