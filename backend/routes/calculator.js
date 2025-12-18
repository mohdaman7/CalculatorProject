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

// Helper function to normalize operation type
const normalizeOperationType = (operationType) => {
  const mapping = {
    '+': 'addition',
    '-': 'subtraction',
    '*': 'multiplication',
    '×': 'multiplication',
    '/': 'division',
    '÷': 'division',
    'add': 'addition',
    'sub': 'subtraction',
    'mul': 'multiplication',
    'div': 'division',
  };
  
  const normalized = mapping[operationType] || operationType;
  const validTypes = ['addition', 'subtraction', 'multiplication', 'division', 'mixed', 'age_calculation'];
  
  return validTypes.includes(normalized) ? normalized : 'mixed';
};

// Save calculation history (saves ALL calculations)
router.post('/history', auth, async (req, res) => {
  try {
    const { expression, actualResult, forcedResult, wasForced, operationType, deviceId, year, age, pincode, addressTaluk, addressDistrict, addressState } = req.body;

    const history = new CalculationHistory({
      userId: req.user._id,
      expression,
      actualResult,
      forcedResult,
      wasForced,
      operationType: normalizeOperationType(operationType),
      deviceId: deviceId || 'unknown',
      year: year || undefined,
      age: age || undefined,
      pincode: pincode || undefined,
      addressTaluk: addressTaluk || undefined,
      addressDistrict: addressDistrict || undefined,
      addressState: addressState || undefined
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

// Calculate and save age
router.post('/calculate-age', auth, async (req, res) => {
  try {
    const { birthYear, deviceId } = req.body;

    if (!birthYear) {
      return res.status(400).json({ error: 'Birth year is required' });
    }

    const currentYear = new Date().getFullYear();
    const calculatedAge = currentYear - birthYear;

    // Validate age
    if (calculatedAge < 0 || calculatedAge > 150) {
      return res.status(400).json({ error: 'Invalid birth year' });
    }

    // Save age calculation to history
    const history = new CalculationHistory({
      userId: req.user._id,
      expression: `Age from ${birthYear}`,
      actualResult: calculatedAge,
      forcedResult: null,
      wasForced: false,
      operationType: 'age_calculation',
      deviceId: deviceId || 'unknown',
      year: birthYear,
      age: calculatedAge
    });

    await history.save();

    res.status(201).json({
      message: 'Age calculated and saved successfully',
      year: birthYear,
      age: calculatedAge,
      history
    });
  } catch (error) {
    console.error('Calculate age error:', error);
    res.status(500).json({ error: 'Server error calculating age' });
  }
});

// Get calculation history with operands (no pagination - returns all)
router.get('/history', auth, async (req, res) => {
  try {
    const { forcedOnly = false } = req.query;
    
    const query = { userId: req.user._id };
    if (forcedOnly === 'true') {
      query.wasForced = true;
    }

    const history = await CalculationHistory.find(query)
      .sort({ createdAt: -1 });

    // Parse expressions to extract operands
    const historyWithOperands = history.map(item => {
      const operands = parseExpression(item.expression);
      const itemObj = item.toObject();
      return {
        ...itemObj,
        operands,
        address: itemObj.pincode ? {
          pincode: itemObj.pincode,
          taluk: itemObj.addressTaluk,
          district: itemObj.addressDistrict,
          state: itemObj.addressState
        } : null
      };
    });

    res.json({
      history: historyWithOperands,
      total: history.length
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

// Update history entry with pincode address
router.put('/history/address', auth, async (req, res) => {
  try {
    const { pincode, addressTaluk, addressDistrict, addressState } = req.body;

    if (!pincode) {
      return res.status(400).json({ error: 'Pincode is required' });
    }

    // Find and update the most recent entry with this pincode
    const result = await CalculationHistory.findOneAndUpdate(
      { 
        userId: req.user._id, 
        pincode: pincode,
        addressTaluk: { $exists: false }
      },
      { 
        addressTaluk,
        addressDistrict,
        addressState
      },
      { new: true, sort: { createdAt: -1 } }
    );

    if (!result) {
      // Try updating any entry with this pincode that has null address
      const result2 = await CalculationHistory.findOneAndUpdate(
        { 
          userId: req.user._id, 
          pincode: pincode,
          $or: [
            { addressTaluk: null },
            { addressTaluk: '' }
          ]
        },
        { 
          addressTaluk,
          addressDistrict,
          addressState
        },
        { new: true, sort: { createdAt: -1 } }
      );

      if (result2) {
        return res.json({ message: 'Address updated', history: result2 });
      }
    }

    res.json({ message: 'Address updated', history: result });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({ error: 'Server error updating address' });
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

// Proxy for pincode API (to avoid CORS issues)
router.get('/pincode/:pincode', async (req, res) => {
  try {
    const { pincode } = req.params;
    
    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({ error: 'Invalid pincode format' });
    }

    const response = await fetch(`https://dev.apiman.in/pincode/${pincode}`);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Pincode API error' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Pincode proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch pincode data' });
  }
});

module.exports = router;
