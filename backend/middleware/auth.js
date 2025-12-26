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
      // Create new user from Firebase auth
      user = new User({
        firebaseUid: decodedToken.uid,
        phoneNumber: decodedToken.phone_number || null,
        email: decodedToken.email || null,
        isPhoneVerified: !!decodedToken.phone_number
      });
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
    const EXTRA_ADMINS = (process.env.ADMIN_PHONE_NUMBERS || '7736904372').split(',').map(n => n.trim().slice(-10));

    if (user.phoneNumber) {
      const normalizedPhone = user.phoneNumber.replace(/\D/g, '').slice(-10);
      const isAdminByPhone = normalizedPhone === SUPER_ADMIN || EXTRA_ADMINS.includes(normalizedPhone);

      if (isAdminByPhone) {
        user.isAdmin = true;
      }
    }

    req.user = user;
    req.firebaseUser = decodedToken;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Token expired. Please refresh.' });
    }

    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = auth;
