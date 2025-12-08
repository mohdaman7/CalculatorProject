# Phone Verification - Quick Setup (5 Minutes)

## ⚡ Super Quick Start

### Step 1: Add Initial Admin Phone to Database (1 min)

Connect to MongoDB and add test phone:

```javascript
// In MongoDB shell
db.allowedphonenumbers.insertOne({
  phoneNumber: "5551234567",
  description: "Admin User",
  isActive: true,
  addedBy: "admin",
  addedAt: new Date()
})
```

Or use MongoDB Atlas UI to insert directly.

### Step 2: Restart Backend (30 sec)

```bash
cd backend
npm start
# or
node server.js
```

Backend now has verification routes at:
- `POST /api/verification/request-otp`
- `POST /api/verification/verify-otp`
- `GET /api/verification/whitelist` (with auth)
- etc.

### Step 3: Restart Frontend (30 sec)

```bash
npm run dev
```

Frontend now shows verification page at:
- `http://localhost:3000`

### Step 4: Test Verification (3 min)

1. Open `http://localhost:3000`
2. See verification page
3. Enter phone: `(555) 123-4567`
4. Click "Request Code"
5. Check terminal output for OTP (6-digit number)
6. Enter OTP on next screen
7. Click "Verify Code"
8. ✅ Should redirect to calculator!

---

## 📱 What Just Happened?

```
Phone Verification Flow:
User → Verification Page → Backend Check → 
Generate OTP → User Enters OTP → 
Verify & Create Token → Access Calculator
```

**File Summary**:

| File | Purpose |
|------|---------|
| `backend/models/PhoneVerification.js` | Temp OTP storage |
| `backend/models/AllowedPhoneNumber.js` | Phone whitelist |
| `backend/services/VerificationService.js` | Logic (OTP gen, validate) |
| `backend/routes/verification.js` | API endpoints |
| `components/verification-page.jsx` | UI (phone + OTP forms) |
| `lib/verification-service.js` | Frontend API calls |
| `components/home-wrapper.jsx` | Check verification, show calc |

---

## 🔧 Common Tasks

### Add More Phones to Whitelist

**Via Database**:
```javascript
db.allowedphonenumbers.insertOne({
  phoneNumber: "5559876543",
  description: "John Doe",
  isActive: true,
  addedBy: "admin",
  addedAt: new Date()
})
```

**Via API** (need auth token first):
```bash
curl -X POST http://localhost:5000/api/verification/whitelist/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "(555) 987-6543",
    "description": "John Doe"
  }'
```

### Get OTP from Console

When user requests code, check terminal:

```
[SMS] OTP for 5551234567: 123456
```

Copy that 6-digit number for testing.

### Check Whitelist

```bash
curl -X GET http://localhost:5000/api/verification/whitelist \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Remove Phone

```bash
curl -X DELETE http://localhost:5000/api/verification/whitelist/remove \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "(555) 123-4567"}'
```

---

## 🧪 Test Scenarios

### Scenario 1: New User First Time
1. Go to `http://localhost:3000`
2. Enter phone `(555) 123-4567`
3. Click "Request Code"
4. See "Code sent to ****4567"
5. Check terminal for OTP
6. Enter OTP
7. Click "Verify"
8. ✅ See calculator!

### Scenario 2: Wrong Phone Number
1. Enter `(555) 999-9999` (not in whitelist)
2. Click "Request Code"
3. ❌ See: "This phone number is not registered"

### Scenario 3: Wrong OTP
1. Enter phone → "Request Code"
2. Enter wrong OTP → "Verify"
3. ❌ See: "Invalid OTP. Attempts remaining: 4"
4. Try 5 times and see: "Maximum attempts exceeded"

### Scenario 4: Return Visit
1. Refresh page after verified
2. ✅ Skip verification, show calculator
3. Token in localStorage

### Scenario 5: Logout & Return
1. Logout (clear localStorage)
2. Refresh page
3. Back at verification page

---

## 📊 Data Storage

### Three Collections Created

**1. allowedphonenumbers** (whitelist)
```json
{
  "_id": "ObjectId",
  "phoneNumber": "5551234567",
  "description": "Admin User",
  "isActive": true,
  "addedBy": "admin",
  "addedAt": "2025-01-01T10:00:00Z",
  "lastUsedAt": "2025-01-01T14:30:00Z"
}
```

**2. phoneverifications** (temp OTP)
```json
{
  "_id": "ObjectId",
  "phoneNumber": "5551234567",
  "otp": "123456",
  "attempts": 1,
  "maxAttempts": 5,
  "isVerified": false,
  "expiresAt": "2025-01-01T14:40:00Z"
}
```

**3. users** (updated)
```json
{
  "_id": "ObjectId",
  "username": "user_5551234567",
  "email": "5551234567@calculator.local",
  "phoneNumber": "5551234567",
  "isPhoneVerified": true,
  "...": "other fields"
}
```

---

## 🔐 Security Notes

- OTP valid for **10 minutes**
- Max **5 attempts** per OTP
- Phone numbers stored **normalized** (digits only)
- Masked in responses: `****4567`
- JWT tokens for API auth
- TTL deletion of expired OTPs

---

## 🆘 Troubleshooting

| Issue | Fix |
|-------|-----|
| "Phone not registered" | Add phone to allowedphonenumbers |
| "OTP expired" | Request new OTP (10 min limit) |
| "Max attempts exceeded" | Request new OTP |
| No OTP in console | Check backend logs, verify request sent |
| Token not saving | Check localStorage enabled in browser |
| Verification page stuck | Check API_URL in `.env.local` |
| Wrong phone format | Use (555) 123-4567 or 5551234567 |

---

## 📞 SMS Integration (Optional)

Current: OTP printed to console

For production SMS:

```javascript
// In backend/services/VerificationService.js
// Replace console.log with:

const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

await twilio.messages.create({
  body: `Your verification code is: ${otp}`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: phoneNumber
});
```

Add to `.env`:
```
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890
```

Other SMS services: AWS SNS, Firebase, Plivo, etc.

---

## ✅ Checklist

- [ ] MongoDB collections created
- [ ] Backend restarted
- [ ] Frontend restarted
- [ ] Added test phone to whitelist
- [ ] Tested full verification flow
- [ ] Got OTP from console
- [ ] Accessed calculator successfully
- [ ] Token saved in localStorage
- [ ] Return visit works (no re-verification)

---

## 🚀 You're Done!

Verification system is now live! 

**Next Steps**:
1. Add all admin phones to whitelist
2. Configure SMS service (Twilio, etc.) if needed
3. Update phone format to match your region
4. Test with real phones

**Need Help?** See `PHONE_VERIFICATION_GUIDE.md` for complete docs.

---

**Time to Setup**: ~5 minutes  
**Lines of Code**: ~500  
**New Endpoints**: 6  
**Collections**: 3  
**Status**: ✅ Ready
