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

    // Explicitly grant admin status to admins in the request object
    const SUPER_ADMIN = process.env.SUPER_ADMIN_PHONE || '9999999999';
    const EXTRA_ADMINS = (process.env.ADMIN_PHONE_NUMBERS || '7736904372,8143831846').split(',').map(n => n.trim().slice(-10));
    const WhitelistedPhone = require('../models/WhitelistedPhone');

    if (user.phoneNumber) {
      const normalizedPhone = user.phoneNumber.replace(/\D/g, '').slice(-10);
      const isAdminByPhone = normalizedPhone === SUPER_ADMIN || EXTRA_ADMINS.includes(normalizedPhone);

      // Also check whitelist for dynamic admin status
      const whitelisted = await WhitelistedPhone.findOne({ phoneNumber: normalizedPhone });
      const isWhitelistedAdmin = whitelisted ? whitelisted.isAdminRequested : false;

      if (isAdminByPhone || isWhitelistedAdmin) {
        user.isAdmin = true;
      } else {
        // If they were admin before but revoked in whitelist, update local record
        user.isAdmin = false;
      }
    }

    // Set isSuperAdmin on the user object for routes to use
    user.isSuperAdmin = isAdminByPhone;

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
