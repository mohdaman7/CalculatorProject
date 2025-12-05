const express = require('express');
const CalculationHistory = require('../models/CalculationHistory');
const auth = require('../middleware/auth');

const router = express.Router();

// Helper function to parse expression and extract operands
const parseExpression = (expression) => {
  // Expression format: "10 + 20" or "10 - 5" etc
  const parts = expression.split(/\s+/);
  return {
    firstOperand: parts[0],
    operator: parts[1],
    secondOperand: parts[2]
  };
};

// Save calculation history (saves ALL calculations)
router.post('/history', auth, async (req, res) => {
  try {
    const { expression, actualResult, forcedResult, wasForced, operationType, deviceId } = req.body;

    const history = new CalculationHistory({
      userId: req.user._id,
      expression,
      actualResult,
      forcedResult,
      wasForced,
      operationType,
      deviceId: deviceId || 'unknown'
    });

    await history.save();

    res.status(201).json({
      message: 'Calculation saved successfully',
      history
    });
  } catch (error) {
    console.error('Save history error:', error);
    res.status(500).json({ error: 'Server error saving calculation' });
  }
});

// Get calculation history with operands
router.get('/history', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, forcedOnly = true } = req.query;
    
    const query = { userId: req.user._id };
    if (forcedOnly === 'true') {
      query.wasForced = true;
    }

    const history = await CalculationHistory.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await CalculationHistory.countDocuments(query);

    // Parse expressions to extract operands
    const historyWithOperands = history.map(item => {
      const operands = parseExpression(item.expression);
      return {
        ...item.toObject(),
        operands
      };
    });

    res.json({
      history: historyWithOperands,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Server error fetching history' });
  }
});

// Get operands from expression
router.get('/operands/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const history = await CalculationHistory.findById(id);
    
    if (!history) {
      return res.status(404).json({ error: 'Calculation not found' });
    }

    if (history.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const operands = parseExpression(history.expression);

    res.json({
      expression: history.expression,
      operands,
      result: history.actualResult,
      forcedResult: history.forcedResult,
      wasForced: history.wasForced
    });
  } catch (error) {
    console.error('Get operands error:', error);
    res.status(500).json({ error: 'Server error fetching operands' });
  }
});

// Clear calculation history
router.delete('/history', auth, async (req, res) => {
  try {
    const { deviceId } = req.query;
    
    const query = { userId: req.user._id };
    if (deviceId) {
      query.deviceId = deviceId;
    }

    const result = await CalculationHistory.deleteMany(query);

    res.json({
      message: 'History cleared successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Clear history error:', error);
    res.status(500).json({ error: 'Server error clearing history' });
  }
});

// Sync offline data
router.post('/sync', auth, async (req, res) => {
  try {
    const { calculations } = req.body;

    if (!Array.isArray(calculations)) {
      return res.status(400).json({ error: 'Calculations must be an array' });
    }

    const syncedCalculations = [];

    for (const calc of calculations) {
      try {
        const history = new CalculationHistory({
          userId: req.user._id,
          ...calc
        });
        await history.save();
        syncedCalculations.push(history);
      } catch (error) {
        console.error('Error syncing calculation:', error);
        // Continue with other calculations even if one fails
      }
    }

    res.json({
      message: `Synced ${syncedCalculations.length} calculations successfully`,
      syncedCalculations
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: 'Server error during sync' });
  }
});

// Get statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = await CalculationHistory.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          totalCalculations: { $sum: 1 },
          forcedCalculations: { 
            $sum: { $cond: ['$wasForced', 1, 0] } 
          },
          operationTypes: {
            $push: '$operationType'
          }
        }
      },
      {
        $addFields: {
          operationBreakdown: {
            $reduce: {
              input: '$operationTypes',
              initialValue: {},
              in: {
                $mergeObjects: [
                  '$$value',
                  {
                $arrayToObject: [[
                  { k: '$$this', v: { $add: [{ $ifNull: [{ $getField: { field: '$$this', input: '$$value' } }, 0] }, 1] } }
                ]]
              }
                ]
              }
            }
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalCalculations: 0,
      forcedCalculations: 0,
      operationBreakdown: {}
    };

    res.json(result);
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Server error fetching statistics' });
  }
});

module.exports = router;
