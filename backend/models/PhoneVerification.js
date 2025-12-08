const mongoose = require('mongoose');

const phoneVerificationSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  },
  otp: {
    type: String,
    required: true,
    length: 6
  },
  attempts: {
    type: Number,
    default: 0
  },
  maxAttempts: {
    type: Number,
    default: 5
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    index: { expireAfterSeconds: 0 } // Auto-delete after expiry
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
phoneVerificationSchema.index({ phoneNumber: 1, createdAt: -1 });
phoneVerificationSchema.index({ phoneNumber: 1, isVerified: 1 });

module.exports = mongoose.model('PhoneVerification', phoneVerificationSchema);
