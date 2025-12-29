const admin = require('../config/firebase');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Find or create user based on Firebase UID
    let user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      // Create new user from Firebase auth - avoid explicit nulls for unique/sparse fields
      const userObj = {
        firebaseUid: decodedToken.uid,
        isPhoneVerified: !!decodedToken.phone_number
      };

      if (decodedToken.phone_number) userObj.phoneNumber = decodedToken.phone_number;

      user = new User(userObj);
      await user.save();
    } else {
      // Update phone number if changed
      if (decodedToken.phone_number && user.phoneNumber !== decodedToken.phone_number) {
        user.phoneNumber = decodedToken.phone_number;
        user.isPhoneVerified = true;
        await user.save();
      }
    }

    req.user = user;
    req.firebaseUser = decodedToken;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    console.error('Stack:', error.stack);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        error: 'Token expired. Please logout and login again.',
        code: error.code,
        message: error.message
      });
    }

    res.status(401).json({
      error: `Invalid token: ${error.message} (Code: ${error.code || 'unknown'})`,
      message: error.message,
      code: error.code || 'unknown',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = auth;
