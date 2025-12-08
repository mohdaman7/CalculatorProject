const mongoose = require('mongoose');

const allowedPhoneNumberSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  },
  description: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  addedBy: {
    type: String,
    default: 'admin',
    enum: ['admin', 'system']
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  lastUsedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for efficient lookup
allowedPhoneNumberSchema.index({ phoneNumber: 1, isActive: 1 });

module.exports = mongoose.model('AllowedPhoneNumber', allowedPhoneNumberSchema);
