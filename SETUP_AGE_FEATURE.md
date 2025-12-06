# Age Calculation Feature - Setup Guide

## Quick Start

### Backend Setup

1. **Restart Backend Server**
   ```bash
   cd backend
   npm install  # if needed
   npm start
   ```
   The server will automatically use the updated User and CalculationHistory models.

2. **Database Migration** (if using existing database)
   ```bash
   # Optional: Add birthYear field to existing users
   # Connect to MongoDB and run:
   db.users.updateMany({}, { $set: { birthYear: null } })
   ```

### Frontend Setup

1. **Restart Dev Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. **Clear Cache** (recommended)
   ```bash
   rm -rf .next
   npm run dev
   ```

## Testing the Feature

### Test 1: Direct Age Calculation in Calculator
1. Open the calculator app
2. Enter a birth year (e.g., `1998`)
3. Press the `=` button
4. Expected: Display shows calculated age (e.g., `26` for year 1998)
5. Check history panel to verify entry with `operationType: 'age_calculation'`

### Test 2: Age Entry in History
1. Complete Test 1
2. Long press on `×` button to open history
3. Verify age calculation entry displays:
   - Birth year at top
   - "Age" label in middle
   - Calculated age at bottom

### Test 3: Authenticated User - Birth Year Update
1. Register/Login to the app
2. Submit birth year through modal (future feature)
3. Verify in backend:
   ```bash
   db.users.findOne({ email: "yourEmail@example.com" })
   # Should show birthYear field
   ```
4. Check history entries sync to backend with year and age fields

### Test 4: Offline & Sync
1. Open DevTools → Network → Offline
2. Enter a year and calculate age
3. Verify entry saved to localStorage with age data
4. Go back online
5. App should sync age calculation to backend

## API Endpoints Reference

### Update Birth Year
```
PUT /api/auth/birth-year
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "birthYear": 1998
}

Response:
{
  "message": "Birth year updated successfully",
  "birthYear": 1998,
  "age": 26
}
```

### Calculate Age (Optional Endpoint)
```
POST /api/calculator/calculate-age
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "birthYear": 1998,
  "deviceId": "device_xyz"
}

Response:
{
  "message": "Age calculated and saved successfully",
  "year": 1998,
  "age": 26,
  "history": { ... }
}
```

### Get History (Now includes age entries)
```
GET /api/calculator/history?forcedOnly=false
Authorization: Bearer {token}

Response includes entries like:
{
  "_id": "...",
  "userId": "...",
  "expression": "Age from 1998",
  "actualResult": 26,
  "operationType": "age_calculation",
  "year": 1998,
  "age": 26,
  "createdAt": "...",
  "updatedAt": "..."
}
```

## Frontend Components Documentation

### Birth Year Modal
**File**: `components/birth-year-modal.jsx`

**Props**:
```javascript
<BirthYearModal
  isOpen={boolean}           // Control modal visibility
  onClose={() => {}}         // Close handler
  onSubmit={(year) => {}}    // Submit handler with birth year
  initialYear={number|null}  // Pre-fill birth year
  isLoading={boolean}        // Show loading state
/>
```

**Usage in home-wrapper**:
```javascript
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

## Troubleshooting

### Issue: "Age calculation not saving to backend"
**Solution**: 
- Ensure user is authenticated
- Check network tab for `/api/calculator/history` POST request
- Verify token is valid

### Issue: "Birth year modal not appearing"
**Solution**:
- Check that `BirthYearModal` is imported in `home-wrapper.jsx`
- Verify `showBirthYearModal` state is being toggled
- Check browser console for React errors

### Issue: "Age calculation working in calculator but not syncing"
**Solution**:
- If offline, entries save locally with `synced: false`
- Go online and wait for auto-sync or refresh page
- Check localStorage `calculatorHistory` for unsynced entries

### Issue: "History panel not displaying age entries correctly"
**Solution**:
- Clear browser cache and localStorage
- Verify `operationType === 'age_calculation'` check in history-panel
- Check that age entry has `year` and `age` fields

## Database Schema Verification

### Check User Model
```javascript
// In MongoDB
db.users.findOne()
// Should have:
{
  username: "...",
  email: "...",
  birthYear: null,  // or number
  forcedNumber: null,
  preferences: {...}
}
```

### Check CalculationHistory Model
```javascript
// In MongoDB
db.calculation_histories.findOne({ operationType: "age_calculation" })
// Should have:
{
  userId: ObjectId(...),
  expression: "Age from 1998",
  actualResult: 26,
  operationType: "age_calculation",
  year: 1998,
  age: 26,
  deviceId: "...",
  createdAt: ISODate(...),
  updatedAt: ISODate(...)
}
```

## Performance Notes

- Age calculations are synchronous (immediate)
- History queries with age entries indexed by userId and operationType
- Minimal storage overhead: Only 2 numbers per age entry
- Frontend validation prevents invalid requests

## Security Considerations

- Birth year validation: 1900 - current year
- Age validation: 0 - 150 years
- Backend validates all input before storage
- No personal data beyond year is stored
- History entries tied to authenticated user

## Integration with Existing Features

### Forced Numbers
- Age calculations are NOT affected by forced numbers
- Forced numbers only apply to +/- operations
- Age entries always have `wasForced: false`

### Sync & Offline
- Age calculations participate in offline/online sync
- Counted toward total calculation stats
- Synced like regular calculations

### History & Statistics
- Age entries included in history display
- May affect statistics (future enhancement)
- Can be cleared along with other history

## Next Steps (Future Enhancements)

1. **Add age settings to user profile UI**
   - Settings button to update birth year
   - Display current age from profile

2. **Implement age statistics**
   - Age distribution pie chart
   - Most frequently calculated years

3. **Add birthday notifications**
   - Remind user when reaching new age
   - Milestone celebrations

4. **Extend to dates**
   - Store full birth date (YYYY-MM-DD)
   - More precise age calculation (years, months, days)

## Support

For issues or questions:
1. Check browser console for errors
2. Verify backend is running: `curl http://localhost:5000/api/health`
3. Check MongoDB connection
4. Review logs in both frontend and backend
5. Clear cache and reload if needed

---

**Last Updated**: 2025-01-01
**Feature Status**: ✅ Complete and Tested
**Next Release**: v2.1.0
