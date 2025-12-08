# Phone Number Verification System - Complete Guide

## Overview

This document describes the phone number verification system that restricts access to the Calculator PWA. Only phone numbers added to the whitelist by administrators can access the application.

**Status**: ✅ Complete and Ready for Implementation

---

## User Flow

### First-Time Access Flow

```
User visits PWA
         ↓
    Verification Page
    (Phone Number Entry)
         ↓
    User enters phone number
         ↓
    Click "Request Code"
         ↓
    System checks if phone is whitelisted
         ↓
    If whitelisted:
      - Generate 6-digit OTP
      - Send via SMS (configured in backend)
      - Show OTP entry screen
         ↓
    User enters OTP
         ↓
    System verifies OTP
         ↓
    OTP valid:
      - Create/Update user in database
      - Generate JWT token
      - Save to localStorage
      - Redirect to Calculator
         ↓
    Access to Calculator PWA
```

### Subsequent Access Flow

```
User revisits PWA
         ↓
    Check localStorage for token
         ↓
    Token exists and valid:
      - Bypass verification
      - Show calculator directly
         ↓
    Token expired/missing:
      - Show verification page again
      - Follow above flow
```

---

## Backend Implementation

### New Models

#### 1. PhoneVerification Model (`backend/models/PhoneVerification.js`)
Stores temporary OTP records during verification process.

**Fields**:
- `phoneNumber` (String): User's phone number
- `otp` (String): 6-digit OTP code
- `attempts` (Number): Failed attempt counter
- `maxAttempts` (Number): Maximum allowed attempts (default: 5)
- `isVerified` (Boolean): Verification status
- `expiresAt` (Date): OTP expiration time (10 minutes)
- `createdAt` (Date): Record creation timestamp

**Indexes**:
- Compound index on phoneNumber and createdAt
- Compound index on phoneNumber and isVerified
- TTL index: Auto-delete expired records after 10 minutes

#### 2. AllowedPhoneNumber Model (`backend/models/AllowedPhoneNumber.js`)
Whitelist of phone numbers allowed to access the calculator.

**Fields**:
- `phoneNumber` (String): Whitelisted phone number (unique)
- `description` (String): Optional notes about the user
- `isActive` (Boolean): Enable/disable without deleting (default: true)
- `addedBy` (String): Who added the number (admin/system)
- `addedAt` (Date): When the number was added
- `lastUsedAt` (Date): Last verification attempt
- `createdAt` (Date): Record creation timestamp

**Indexes**:
- Compound index on phoneNumber and isActive for fast lookup

#### 3. Updated User Model
Added phone-related fields to existing User model:

```javascript
phoneNumber: String,           // User's phone number
isPhoneVerified: Boolean       // Verification status
```

### New Service: VerificationService (`backend/services/VerificationService.js`)

Core verification logic with the following methods:

#### `generateOTP()`
- Generates random 6-digit OTP
- Returns: `String` (6 digits)

#### `isPhoneNumberAllowed(phoneNumber)`
- Checks if phone is in whitelist
- Returns: `Promise<Boolean>`

#### `normalizePhoneNumber(phoneNumber)`
- Removes special characters from phone number
- Returns: `String` (last 10 digits)

#### `requestOTP(phoneNumber)`
- Validates phone is whitelisted
- Generates OTP
- Saves to PhoneVerification collection
- Returns: `Promise<{success, message, phoneNumber, expiresIn}>`

#### `verifyOTP(phoneNumber, otp)`
- Validates OTP against stored record
- Checks expiration and attempts
- Marks as verified on success
- Returns: `Promise<{success, message}>`

#### `maskPhoneNumber(phoneNumber)`
- Masks phone for display (e.g., ****7890)
- Returns: `String`

#### `isPhoneVerifiedRecently(phoneNumber, withinMinutes)`
- Checks if phone was verified within specified time
- Default: 30 minutes
- Returns: `Promise<Boolean>`

#### `addPhoneToWhitelist(phoneNumber, description)`
- Admin function to add phone to whitelist
- Returns: `Promise<{success, message, phoneNumber}>`

#### `removePhoneFromWhitelist(phoneNumber)`
- Admin function to remove from whitelist
- Returns: `Promise<{success, message}>`

#### `getAllowedPhones()`
- Admin function to list all whitelisted phones
- Returns: `Promise<{success, count, phones}>`

### New Routes: Verification Routes (`backend/routes/verification.js`)

#### Public Endpoints

**POST `/api/verification/request-otp`**
- **Purpose**: Request verification code
- **Request**:
  ```json
  {
    "phoneNumber": "(123) 456-7890"
  }
  ```
- **Response (Success)**:
  ```json
  {
    "success": true,
    "message": "OTP sent successfully. Please check your SMS.",
    "phoneNumber": "****7890",
    "expiresIn": 600
  }
  ```
- **Response (Error)**:
  ```json
  {
    "success": false,
    "error": "This phone number is not registered. Please contact administrator."
  }
  ```
- **Error Cases**:
  - Empty phone number
  - Invalid phone format
  - Phone not in whitelist
  - Server error

**POST `/api/verification/verify-otp`**
- **Purpose**: Verify OTP and get access token
- **Request**:
  ```json
  {
    "phoneNumber": "(123) 456-7890",
    "otp": "123456"
  }
  ```
- **Response (Success)**:
  ```json
  {
    "success": true,
    "message": "Phone verification successful",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "ObjectId",
      "username": "user_1234567890",
      "email": "1234567890@calculator.local",
      "phoneNumber": "1234567890",
      "isPhoneVerified": true,
      "forcedNumber": null,
      "secondForceNumber": null,
      "secondForceTriggerNumber": null,
      "birthYear": null,
      "preferences": {...}
    }
  }
  ```
- **Response (Error)**:
  ```json
  {
    "success": false,
    "error": "Invalid OTP. Attempts remaining: 3"
  }
  ```
- **Error Cases**:
  - Missing phone or OTP
  - Invalid OTP format
  - OTP mismatch
  - OTP expired
  - Max attempts exceeded
  - No OTP record found

**POST `/api/verification/check-verification`**
- **Purpose**: Check if phone was recently verified
- **Request**:
  ```json
  {
    "phoneNumber": "(123) 456-7890"
  }
  ```
- **Response**:
  ```json
  {
    "phoneNumber": "****7890",
    "isVerified": true
  }
  ```

#### Admin Endpoints (Requires Authentication)

**POST `/api/verification/whitelist/add`**
- **Purpose**: Add phone to whitelist
- **Headers**: `Authorization: Bearer {token}`
- **Request**:
  ```json
  {
    "phoneNumber": "(123) 456-7890",
    "description": "John Doe - Senior Admin"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Phone number added to whitelist successfully",
    "phoneNumber": "1234567890"
  }
  ```

**DELETE `/api/verification/whitelist/remove`**
- **Purpose**: Remove phone from whitelist
- **Headers**: `Authorization: Bearer {token}`
- **Request**:
  ```json
  {
    "phoneNumber": "(123) 456-7890"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Phone number removed from whitelist"
  }
  ```

**GET `/api/verification/whitelist`**
- **Purpose**: List all whitelisted phones
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
  ```json
  {
    "success": true,
    "count": 5,
    "phones": [
      {
        "_id": "ObjectId",
        "phoneNumber": "1234567890",
        "description": "John Doe",
        "isActive": true,
        "addedBy": "admin",
        "addedAt": "2025-01-01T10:00:00Z",
        "lastUsedAt": "2025-01-01T14:30:00Z"
      }
    ]
  }
  ```

---

## Frontend Implementation

### Verification Page Component (`components/verification-page.jsx`)

**Purpose**: Two-step phone verification UI

**Features**:
- Phone number input with validation
- Real-time error messages
- Masked phone display
- OTP input with formatting (accepts only digits)
- Countdown timer for OTP expiration
- Attempt counter
- Loading states
- Responsive design (Tailwind CSS)

**Props**:
```javascript
<VerificationPage
  onVerificationComplete={(user, token) => {}}  // Called on successful verification
/>
```

**States**:
- `step`: 'phone' or 'otp'
- `phoneNumber`: User input phone
- `otp`: User input OTP
- `error`: Error message
- `loading`: API call status
- `maskedPhone`: Display version of phone
- `expiresIn`: OTP expiration countdown
- `attempts`: Remaining verification attempts

**Flow**:
1. User enters phone number
2. Click "Request Code" button
3. System calls `/api/verification/request-otp`
4. On success: Switch to OTP input step
5. User enters 6-digit OTP
6. Click "Verify Code" button
7. System calls `/api/verification/verify-otp`
8. On success: Save token and call callback
9. Redirect to calculator

### Verification Service (`lib/verification-service.js`)

Client-side service for verification API calls.

**Methods**:

```javascript
verificationService.requestOTP(phoneNumber)
// Returns: {success, error, phoneNumber, expiresIn}

verificationService.verifyOTP(phoneNumber, otp)
// Returns: {success, error, token, user}

verificationService.checkVerification(phoneNumber)
// Returns: {phoneNumber, isVerified}

verificationService.addPhoneToWhitelist(phoneNumber, token, description)
// Returns: {success, message, phoneNumber}

verificationService.removePhoneFromWhitelist(phoneNumber, token)
// Returns: {success, message}

verificationService.getWhitelistedPhones(token)
// Returns: {success, count, phones}

verificationService.isVerified()
// Returns: Boolean (checks localStorage)

verificationService.getStoredPhone()
// Returns: String (phone from localStorage)

verificationService.logout()
// Clears verification data
```

### Home Wrapper Integration

Updated `components/home-wrapper.jsx`:

1. Import verification page and service
2. Add state for phone verification
3. Check verification on mount
4. Show verification page if not verified
5. On successful verification: Show calculator
6. On logout: Clear verification

---

## Setup Instructions

### 1. Backend Setup

#### Install Dependencies
No new packages required (uses existing `mongoose` and `express`)

#### Update Database Connection
Ensure MongoDB is running and connection string is set in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/calculator-pwa
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
```

#### Database Initialization
Collections auto-created on first use:
- `phoneverifications` (TTL collection)
- `allowedphonenumbers`
- `users` (updated schema)

#### Add Initial Whitelist
Option 1: Use MongoDB directly
```javascript
db.allowedphonenumbers.insertMany([
  { phoneNumber: "1234567890", description: "Admin 1" },
  { phoneNumber: "0987654321", description: "Admin 2" }
])
```

Option 2: Use API after deployment
```bash
curl -X POST http://localhost:5000/api/verification/whitelist/add \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "(123) 456-7890", "description": "Admin User"}'
```

### 2. Frontend Setup

No additional packages required. Just update components:

1. Copy `components/verification-page.jsx`
2. Copy `lib/verification-service.js`
3. Update `components/home-wrapper.jsx`
4. Update `app/layout.jsx` if needed
5. Restart dev server

### 3. Environment Variables

Frontend (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Backend (`.env`):
```
MONGODB_URI=mongodb://localhost:27017/calculator-pwa
JWT_SECRET=your-jwt-secret
JWT_EXPIRE=7d
PORT=5000
```

---

## SMS Integration (Optional)

Current implementation logs OTP to console. For production SMS:

**Update `VerificationService.js` line ~46**:

```javascript
// Replace console.log with SMS service
// Example using Twilio:
await twilio.messages.create({
  body: `Your verification code is: ${otp}`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: phoneNumber
});
```

Or any SMS service (AWS SNS, Firebase, etc.):
- Vonage/Nexmo
- Plivo
- SignalWire
- MessageBird

---

## Testing

### Test Phone Numbers
Add these to whitelist for testing:
```
(555) 123-4567
(555) 123-4568
(555) 123-4569
```

### Manual Testing Workflow

1. **Request OTP**
   - Open calculator PWA
   - See verification page
   - Enter test phone number: `(555) 123-4567`
   - Click "Request Code"
   - Expected: Success message, switch to OTP page
   - Check backend logs for OTP (console output)

2. **Verify OTP**
   - Enter 6-digit OTP from logs
   - Click "Verify Code"
   - Expected: Redirect to calculator, token in localStorage

3. **Subsequent Access**
   - Refresh page
   - Expected: Skip verification, show calculator
   - Token stored in localStorage

4. **Logout**
   - Click logout in settings (if implemented)
   - Expected: Clear localStorage, show verification on refresh

5. **Invalid Scenarios**
   - Wrong phone: "This phone number is not registered"
   - Wrong OTP: "Invalid OTP. Attempts remaining: X"
   - Expired OTP: "OTP expired. Please request a new one."
   - Max attempts: "Maximum attempts exceeded..."

### API Testing

```bash
# Request OTP
curl -X POST http://localhost:5000/api/verification/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "(555) 123-4567"}'

# Verify OTP (use OTP from console output)
curl -X POST http://localhost:5000/api/verification/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "(555) 123-4567", "otp": "123456"}'

# Get whitelisted phones (requires token from verify-otp)
curl -X GET http://localhost:5000/api/verification/whitelist \
  -H "Authorization: Bearer {TOKEN}"
```

---

## Security Considerations

### Phone Number Protection
- Masked in responses (`****7890`)
- Normalized before storage (removes formatting)
- Validated on both frontend and backend

### OTP Security
- 6-digit random generation
- 10-minute expiration
- Max 5 attempts per OTP
- Deleted on verification or expiry
- One OTP per phone number (overwrites previous)

### Database Security
- Automatic OTP deletion via TTL index
- Phone numbers indexed for fast lookup
- JWT tokens for API authentication
- Validation on all endpoints

### Frontend Security
- Token stored in localStorage
- Verification checked on mount
- No sensitive data in local storage
- HTTPS recommended in production

---

## Admin Management

### Add Phone Number
1. Authenticate with existing admin account
2. Call `/api/verification/whitelist/add`
3. Phone added to whitelist

### Remove Phone Number
1. Call `/api/verification/whitelist/remove`
2. Phone deleted from whitelist

### View All Phones
1. Call `/api/verification/whitelist`
2. See count, phone list, last used times

### Disable Without Deleting
1. Update `AllowedPhoneNumber` with `isActive: false`
2. Phone can't verify but record remains

---

## Troubleshooting

### "Phone not registered" Error
- Check if phone is in AllowedPhoneNumber collection
- Add phone via admin endpoint
- Verify phone number format (10 digits)

### "OTP expired" Error
- OTP valid for 10 minutes only
- Click "Request again" to get new OTP
- Each request deletes previous OTP

### "Maximum attempts exceeded"
- Max 5 attempts per OTP
- Request new OTP to reset counter

### Token Not Saved
- Check if browser allows localStorage
- Check console for errors
- Clear browser cache and try again

### User Created Without Phone
- Check `isPhoneVerified` field is set to `true`
- Verify OTP confirmation succeeded

---

## Future Enhancements

1. **Email Alternative**: Add email verification as alternative to SMS
2. **Biometric**: Add fingerprint/face recognition after first verification
3. **Admin Dashboard**: UI for managing whitelisted phones
4. **Audit Log**: Track all verification attempts
5. **Rate Limiting**: Limit OTP requests per phone
6. **2FA**: Add two-factor authentication
7. **Phone Change**: Allow verified users to change phone
8. **Auto-Logout**: Logout after inactivity period

---

## File Locations

### Backend Files
- `backend/models/PhoneVerification.js` - OTP storage model
- `backend/models/AllowedPhoneNumber.js` - Whitelist model
- `backend/models/User.js` - Updated with phone fields
- `backend/services/VerificationService.js` - Core logic
- `backend/routes/verification.js` - API endpoints
- `backend/server.js` - Updated with verification routes

### Frontend Files
- `components/verification-page.jsx` - Verification UI
- `lib/verification-service.js` - Client service
- `components/home-wrapper.jsx` - Updated integration

---

## Support & Debugging

### Enable Debug Logging
Add to backend:
```javascript
console.log(`[VERIFICATION] OTP for ${phoneNumber}: ${otp}`)
console.log(`[VERIFICATION] Phone whitelisted: ${phoneNumber}`)
```

### Check Database
```javascript
// Check OTP records
db.phoneverifications.find({phoneNumber: "1234567890"})

// Check whitelist
db.allowedphonenumbers.find({phoneNumber: "1234567890"})

// Check users
db.users.find({phoneNumber: "1234567890"})
```

### Monitor Requests
- Enable Network tab in DevTools
- Watch `/api/verification/*` requests
- Check request/response payloads

---

**Version**: 1.0.0  
**Status**: ✅ Complete & Ready  
**Last Updated**: 2025-01-01  
**Maintainer**: Dev Team
