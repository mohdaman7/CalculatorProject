# Age Calculation Feature - Complete Code Changes

## Summary of All Changes

This document provides a quick reference of all code modifications made to implement the age calculation feature.

---

## 1. Backend Models

### backend/models/User.js
**Change**: Added `birthYear` field to user schema

```javascript
// Added field:
birthYear: {
  type: Number,
  default: null,
  min: 1900,
  max: new Date().getFullYear()
}
```

### backend/models/CalculationHistory.js
**Changes**: 
- Added 'age_calculation' to operationType enum
- Added year and age fields

```javascript
// Modified operationType:
operationType: {
  type: String,
  enum: ['addition', 'subtraction', 'multiplication', 'division', 'mixed', 'age_calculation'],
  required: true
},

// Added fields:
year: {
  type: Number,
  required: false
},
age: {
  type: Number,
  required: false
}
```

---

## 2. Backend Routes

### backend/routes/auth.js
**Changes**:
- Updated register response to include birthYear
- Updated login response to include birthYear
- Updated /me endpoint response to include birthYear
- Added new PUT /birth-year endpoint

```javascript
// Added in register, login, and /me responses:
birthYear: user.birthYear,

// New endpoint added:
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
```

### backend/routes/calculator.js
**Changes**:
- Enhanced /history POST to accept year and age fields
- Added new POST /calculate-age endpoint

```javascript
// Enhanced POST /history:
router.post('/history', auth, async (req, res) => {
  try {
    const { expression, actualResult, forcedResult, wasForced, operationType, deviceId, year, age } = req.body;

    const history = new CalculationHistory({
      userId: req.user._id,
      expression,
      actualResult,
      forcedResult,
      wasForced,
      operationType,
      deviceId: deviceId || 'unknown',
      year: year || undefined,
      age: age || undefined
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

// New endpoint:
router.post('/calculate-age', auth, async (req, res) => {
  try {
    const { birthYear, deviceId } = req.body;

    if (!birthYear) {
      return res.status(400).json({ error: 'Birth year is required' });
    }

    const currentYear = new Date().getFullYear();
    const calculatedAge = currentYear - birthYear;

    if (calculatedAge < 0 || calculatedAge > 150) {
      return res.status(400).json({ error: 'Invalid birth year' });
    }

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
```

---

## 3. Frontend Services

### src/lib/api/services/AuthService.js
**Change**: Added updateBirthYear method

```javascript
async updateBirthYear(birthYear) {
  try {
    const response = await axiosInstance.put(`${this.endpoint}/birth-year`, { birthYear });
    return response.data;
  } catch (error) {
    this.handleError(error);
  }
}
```

### src/lib/api/services/CalculatorService.js
**Changes**: Added calculateAge and clearHistory methods

```javascript
async calculateAge(birthYear, deviceId) {
  try {
    const response = await this.request({
      method: 'POST',
      url: '/calculate-age',
      data: { birthYear, deviceId }
    });
    return response;
  } catch (error) {
    this.handleError(error);
  }
}

async clearHistory(deviceId = null) {
  try {
    const response = await this.request({
      method: 'DELETE',
      url: '/history',
      params: deviceId ? { deviceId } : {}
    });
    return response;
  } catch (error) {
    this.handleError(error);
  }
}
```

### lib/api.js
**Change**: Added updateBirthYear method

```javascript
async updateBirthYear(birthYear) {
  return this.request('/auth/birth-year', {
    method: 'PUT',
    body: JSON.stringify({ birthYear }),
  });
}
```

---

## 4. Frontend Context

### contexts/AuthContext.jsx
**Changes**: 
- Added updateBirthYear method to context
- Included in context value exports

```javascript
const updateBirthYear = async (birthYear) => {
  try {
    setError(null);
    const data = await authService.updateBirthYear(birthYear);
    setUser(prev => ({ 
      ...prev, 
      birthYear: data.birthYear
    }));
    return data;
  } catch (error) {
    setError(error.message);
    throw error;
  }
}

// Added to context value:
const value = {
  user,
  loading,
  error,
  login,
  register,
  logout,
  updateForcedNumber,
  updateBirthYear,  // NEW
  isAuthenticated: !!user
}
```

---

## 5. Frontend Components

### components/birth-year-modal.jsx (NEW FILE)
**Complete new component** for birth year input

```javascript
"use client"

import { useState } from 'react';

const BirthYearModal = ({ isOpen, onClose, onSubmit, initialYear = null, isLoading = false }) => {
  const [year, setYear] = useState(initialYear?.toString() || '');
  const [error, setError] = useState('');

  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!year) {
      setError('Please enter a birth year');
      return;
    }

    const birthYear = parseInt(year, 10);

    if (isNaN(birthYear)) {
      setError('Please enter a valid year');
      return;
    }

    if (birthYear < 1900 || birthYear > currentYear) {
      setError(`Birth year must be between 1900 and ${currentYear}`);
      return;
    }

    const age = currentYear - birthYear;
    if (age > 150) {
      setError('Please enter a valid birth year');
      return;
    }

    onSubmit(birthYear);
    setYear('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#1c1c1c] rounded-2xl p-8 max-w-sm w-full mx-4 border border-[#333]">
        <h2 className="text-white text-2xl font-light mb-6 text-center">Enter Birth Year</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="number"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setError('');
              }}
              placeholder="e.g., 1998"
              min="1900"
              max={currentYear}
              className="w-full bg-[#333] text-white px-4 py-3 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-[#FF9F0A] placeholder-gray-500"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          {year && !error && (
            <div className="text-gray-400 text-sm text-center">
              Age: {currentYear - parseInt(year, 10)} years
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-transparent border border-white/30 text-white py-3 rounded-lg font-medium hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#FF9F0A] text-black py-3 rounded-lg font-medium hover:bg-[#FFB340] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                'Calculate Age'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BirthYearModal;
```

### components/calculator.jsx
**Change**: handleEquals function already has age calculation logic (lines 103-127)

```javascript
// In handleEquals function, detects 4-digit year:
const handleEquals = () => {
  const currentValue = Number.parseFloat(display);
  
  // Check if display is a 4-digit year (1900-2100)
  if (display.length === 4 && !operation && previousValue === null) {
    const year = parseInt(display);
    if (year >= 1900 && year <= 2100) {
      const currentYear = new Date().getFullYear();
      const age = currentYear - year;
      const timestamp = new Date().toLocaleString();
      
      onAddToHistory({
        expression: `Year: ${display}`,
        result: age,
        actualResult: age,
        forcedResult: null,
        timestamp,
        forced: false,
        operationType: 'age_calculation',
        year: year,
        age: age
      });
      
      setDisplay(String(age));
      setWaitingForNewValue(true);
      return;
    }
  }
  
  // ... rest of regular calculation logic
};
```

### components/history-panel.jsx
**Change**: Added age calculation display logic (lines 37-57)

```javascript
// In history.map, added check for age calculations:
if (entry.operationType === 'age_calculation') {
  return (
    <div key={idx} className="text-center">
      {/* Year */}
      <div className="text-white text-5xl font-light tracking-tight mb-4">
        {entry.year}
      </div>
      
      {/* Age Label */}
      <div className="text-gray-400 text-sm mb-2">
        Age
      </div>
      
      {/* Age Result */}
      <div className="text-white text-5xl font-light tracking-tight">
        {entry.age}
      </div>
    </div>
  );
}
```

### components/home-wrapper.jsx
**Changes**:
- Imported BirthYearModal
- Added state for birth year modal and loading
- Added handleBirthYearSubmit method
- Enhanced handleAddToHistory to support age entries
- Added BirthYearModal component render

```javascript
// Added imports:
import BirthYearModal from "@/components/birth-year-modal"

// Added state:
const [showBirthYearModal, setShowBirthYearModal] = useState(false)
const [birthYearLoading, setBirthYearLoading] = useState(false)

// New handler:
const handleBirthYearSubmit = async (birthYear) => {
  setBirthYearLoading(true)
  try {
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear

    if (isAuthenticated) {
      await apiService.updateBirthYear(birthYear)
    }

    const ageEntry = {
      expression: `Age from ${birthYear}`,
      result: age,
      actualResult: age,
      forcedResult: null,
      timestamp: new Date().toLocaleString(),
      forced: false,
      operationType: 'age_calculation',
      year: birthYear,
      age: age
    }

    handleAddToHistory(ageEntry)
    setShowBirthYearModal(false)
  } catch (error) {
    console.error('Failed to save birth year:', error)
  } finally {
    setBirthYearLoading(false)
  }
}

// Enhanced handleAddToHistory:
const handleAddToHistory = async (entry) => {
  const newEntry = { ...entry, id: Date.now(), synced: false }
  setHistory([newEntry, ...history])

  if (isAuthenticated) {
    try {
      const payload = {
        expression: entry.expression,
        actualResult: entry.actualResult || entry.result,
        forcedResult: entry.forced ? entry.result : null,
        wasForced: entry.forced,
        operationType: entry.operationType || getOperationType(entry.expression),
        deviceId: getDeviceId()
      }

      // Add age calculation specific fields
      if (entry.operationType === 'age_calculation') {
        payload.year = entry.year
        payload.age = entry.age
      }

      await apiService.saveCalculation(payload)
      
      setHistory(prev => prev.map(item => 
        item.id === newEntry.id ? { ...item, synced: true } : item
      ))
    } catch (error) {
      console.error('Failed to save to backend:', error)
    }
  }
}

// Added component render:
{showBirthYearModal && (
  <BirthYearModal
    isOpen={showBirthYearModal}
    onClose={() => setShowBirthYearModal(false)}
    onSubmit={handleBirthYearSubmit}
    initialYear={user?.birthYear}
    isLoading={birthYearLoading}
  />
)}
```

---

## 6. Documentation Files (NEW)

### AGE_CALCULATION_FEATURE.md
Comprehensive documentation of the feature implementation

### SETUP_AGE_FEATURE.md
Step-by-step setup and testing guide

### CODE_CHANGES_SUMMARY.md
This file - summary of all code changes

---

## Testing Code Examples

### Test Age Calculation in Calculator
```javascript
// In browser console
// Simulate entering year 1998
localStorage.setItem('calculatorHistory', JSON.stringify([
  {
    id: Date.now(),
    expression: 'Year: 1998',
    result: 26,
    actualResult: 26,
    forcedResult: null,
    timestamp: new Date().toLocaleString(),
    forced: false,
    operationType: 'age_calculation',
    year: 1998,
    age: 26,
    synced: false
  }
]));
```

### Test Backend Age Calculation
```bash
# Test update birth year
curl -X PUT http://localhost:5000/api/auth/birth-year \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"birthYear": 1998}'

# Response:
# {"message": "Birth year updated successfully", "birthYear": 1998, "age": 26}
```

---

## Key Implementation Details

### Age Detection Logic
- Triggers on 4-digit number in 1900-2100 range
- Only when no operation in progress
- Only when no previous value

### Sync Strategy
- Age entries sync to backend like regular calculations
- Stored with full entry metadata
- Indexed by userId for efficient queries

### Validation
- Backend: 1900 ≤ year ≤ current year
- Backend: 0 ≤ age ≤ 150
- Frontend: User-friendly error messages
- Real-time preview in modal

### Data Structure
Age calculation history entry:
```json
{
  "operationType": "age_calculation",
  "year": 1998,
  "age": 26,
  "expression": "Age from 1998",
  "actualResult": 26
}
```

---

## Backwards Compatibility

✅ **Fully Compatible**
- Existing calculations unaffected
- Optional birthYear field doesn't break existing users
- History queries still work with new operationType
- No breaking API changes

---

## Performance Impact

**Minimal**:
- Age calculation: O(1) - just subtraction
- Storage: 2 additional numbers per entry (8 bytes)
- Queries: Indexed by userId, minimal overhead
- Frontend: No additional re-renders for regular calculations

---

**All changes are complete and ready for deployment.**
