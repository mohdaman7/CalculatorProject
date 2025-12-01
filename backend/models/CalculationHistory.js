const mongoose = require('mongoose');

const calculationHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expression: {
    type: String,
    required: true
  },
  actualResult: {
    type: Number,
    required: true
  },
  forcedResult: {
    type: Number,
    required: false
  },
  wasForced: {
    type: Boolean,
    required: true
  },
  operationType: {
    type: String,
    enum: ['addition', 'subtraction', 'multiplication', 'division', 'mixed'],
    required: true
  },
  deviceId: {
    type: String,
    required: true
  },
  syncedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
calculationHistorySchema.index({ userId: 1, createdAt: -1 });
calculationHistorySchema.index({ userId: 1, wasForced: 1 });

module.exports = mongoose.model('CalculationHistory', calculationHistorySchema);
