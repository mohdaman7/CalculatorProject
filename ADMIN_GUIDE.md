# Admin Dashboard - Phone Number Management Guide

## Overview

The Admin Dashboard allows you to manage whitelisted phone numbers without accessing the database directly.

---

## How to Access Admin Dashboard

### Method 1: Through the App (Easiest)

1. **Go to verification page**: `http://localhost:3000`
2. **Enter a phone number**: Use any whitelisted number
3. **Request code**: Click "Request Code"
4. **Check terminal**: Look for OTP in backend console
   ```
   [SMS] OTP for 5551234567: 123456
   ```
5. **Enter OTP**: Type the 6-digit code from console
6. **Click "Verify Code"**: After verification, you'll see a message that redirects to calculator
7. **Look for Admin Button**: At the bottom of screen, click "Admin Dashboard" link
8. **Enter admin panel**: You can now add/remove phones!

### Method 2: Direct Database (If no UI available)

```javascript
// Add to MongoDB directly
db.allowedphonenumbers.insertOne({
  phoneNumber: "5551234567",
  description: "Admin User",
  isActive: true,
  addedBy: "admin",
  addedAt: new Date()
})
```

### Method 3: API Call (Programmatic)

```bash
# Get token first (from verify-otp response)
TOKEN="eyJhbGciOiJIUzI1NiIs..."

# Add phone
curl -X POST http://localhost:5000/api/verification/whitelist/add \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "(555) 123-4567",
    "description": "John Doe - Manager"
  }'

# List all phones
curl -X GET http://localhost:5000/api/verification/whitelist \
  -H "Authorization: Bearer $TOKEN"

# Remove phone
curl -X DELETE http://localhost:5000/api/verification/whitelist/remove \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"phoneNumber": "(555) 123-4567"}'
```

---

## Admin Dashboard Features

### 1. View All Whitelisted Numbers
- See list of all approved phone numbers
- View description/name for each number
- See when phone was added
- See last time phone was used
- Active/Inactive status

### 2. Add New Phone Numbers
1. Enter phone number in format: `(555) 123-4567`
2. (Optional) Add description: `John Doe - Manager`
3. Click "Add Phone" button
4. ✅ Phone added to whitelist

**Valid Phone Formats**:
- `(555) 123-4567`
- `555-123-4567`
- `555.123.4567`
- `5551234567`

### 3. Remove Phone Numbers
1. Find phone in the list
2. Click "Delete" button
3. Button changes to "Confirm?"
4. Click again to confirm deletion
5. ✅ Phone removed from whitelist

### 4. Refresh Phone List
- Click "Refresh" button to reload latest changes
- Automatically updates when you add/remove numbers

---

## Step-by-Step: Add Your First Admin Number

### Step 1: Initial Database Setup
```javascript
// Open MongoDB shell and run:
db.allowedphonenumbers.insertOne({
  phoneNumber: "5551234567",
  description: "First Admin",
  isActive: true,
  addedBy: "admin",
  addedAt: new Date()
})
```

### Step 2: Verify Phone
1. Go to `http://localhost:3000`
2. Enter: `(555) 123-4567`
3. Click "Request Code"
4. Check backend terminal for OTP (e.g., `123456`)
5. Enter OTP: `123456`
6. Click "Verify Code"

### Step 3: Access Admin Dashboard
1. After verification, you'll be redirected to calculator
2. You can also go back to verification page
3. Click "Admin Dashboard" link at bottom
4. ✅ You're in admin panel!

### Step 4: Add More Phones
1. Enter new phone: `(555) 234-5678`
2. Add description: `Jane Smith - Manager`
3. Click "Add Phone"
4. ✅ New phone appears in list

---

## Common Tasks

### Add 10 Admin Phones at Once
```javascript
const adminPhones = [
  { phoneNumber: "5551111111", description: "Admin 1" },
  { phoneNumber: "5552222222", description: "Admin 2" },
  { phoneNumber: "5553333333", description: "Admin 3" },
  { phoneNumber: "5554444444", description: "Admin 4" },
  { phoneNumber: "5555555555", description: "Admin 5" },
  { phoneNumber: "5556666666", description: "Admin 6" },
  { phoneNumber: "5557777777", description: "Admin 7" },
  { phoneNumber: "5558888888", description: "Admin 8" },
  { phoneNumber: "5559999999", description: "Admin 9" },
  { phoneNumber: "5550000000", description: "Admin 10" }
];

// Insert all at once
db.allowedphonenumbers.insertMany(adminPhones);
```

### Find Phones by Description
```javascript
db.allowedphonenumbers.find({ description: { $regex: "Manager" } })
```

### Disable Phone Without Deleting
```javascript
db.allowedphonenumbers.updateOne(
  { phoneNumber: "5551234567" },
  { $set: { isActive: false } }
)
```

### Track Phone Usage
```javascript
// See all phones sorted by last used
db.allowedphonenumbers.find().sort({ lastUsedAt: -1 })
```

---

## Dashboard UI Walkthrough

```
┌─────────────────────────────────────────┐
│  Admin Dashboard                    [X] │
│  Manage whitelisted phone numbers       │
├─────────────────────────────────────────┤
│                                         │
│  Logged in as: 5551234567              │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Add New Phone Number                   │
│  ┌──────────────────────────────────┐  │
│  │ (555) 123-4567   │ Add Phone │   │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ Description (optional)            │  │
│  └──────────────────────────────────┘  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Whitelisted Numbers (3)    [Refresh]  │
│                                         │
│  ✓ ****4567                    [Delete]│
│    John Doe - Admin                     │
│    Added: 1/1/2025 10:00 AM             │
│    Last: 1/2/2025 2:30 PM               │
│                                         │
│  ✓ ****5678                    [Delete]│
│    Jane Smith - Manager                 │
│    Added: 1/1/2025 10:05 AM             │
│                                         │
│  ✓ ****9999                    [Delete]│
│    Bob Wilson - Admin                   │
│    Added: 1/1/2025 10:10 AM             │
│    Last: 1/2/2025 1:15 PM               │
│                                         │
├─────────────────────────────────────────┤
│            [    Close    ]              │
└─────────────────────────────────────────┘
```

---

## Security Notes

✅ **Admin Dashboard is Protected**
- Only accessible after successful phone verification
- Requires valid JWT token
- Backend validates authentication on every request

✅ **Phone Numbers are Masked**
- Display format: `****4567` (only last 4 digits shown)
- Storage format: `5551234567` (10 digits, normalized)

✅ **Actions are Logged**
- Every add/delete action is recorded
- View detailed audit trail in database

---

## Troubleshooting

### "Admin Dashboard" button not showing
- Make sure you've verified your phone successfully
- Check browser console for errors
- Try refreshing the page

### Cannot add phone - gets error
- Check phone number format
- Ensure phone is 10 digits (or valid format)
- Phone might already exist in whitelist

### Phone not appearing in list
- Try clicking "Refresh" button
- Check browser console for API errors
- Verify token is still valid

### OTP not showing in console
- Make sure backend is running
- Check terminal output (not in code editor)
- Try requesting new OTP

---

## Backend API Reference

### Add Phone to Whitelist
```
POST /api/verification/whitelist/add
Authorization: Bearer {token}

Request:
{
  "phoneNumber": "(555) 123-4567",
  "description": "John Doe"
}

Response:
{
  "success": true,
  "message": "Phone number added to whitelist successfully",
  "phoneNumber": "5551234567"
}
```

### Remove Phone from Whitelist
```
DELETE /api/verification/whitelist/remove
Authorization: Bearer {token}

Request:
{
  "phoneNumber": "(555) 123-4567"
}

Response:
{
  "success": true,
  "message": "Phone number removed from whitelist"
}
```

### List All Whitelisted Phones
```
GET /api/verification/whitelist
Authorization: Bearer {token}

Response:
{
  "success": true,
  "count": 5,
  "phones": [
    {
      "_id": "ObjectId",
      "phoneNumber": "5551234567",
      "description": "John Doe",
      "isActive": true,
      "addedAt": "2025-01-01T10:00:00Z",
      "lastUsedAt": "2025-01-02T14:30:00Z"
    }
  ]
}
```

---

## Quick Reference

| Task | Steps |
|------|-------|
| **Access Dashboard** | Verify phone → Click "Admin Dashboard" link |
| **Add Phone** | Enter number → (Optional) add description → Click "Add Phone" |
| **Remove Phone** | Find in list → Click "Delete" → Confirm |
| **View All Phones** | Dashboard automatically loads list on open |
| **Refresh List** | Click "Refresh" button |
| **Bulk Add** | Use MongoDB: `db.allowedphonenumbers.insertMany([...])` |

---

## Dashboard File Structure

- **Component**: `components/admin-dashboard.jsx`
- **Service**: `lib/verification-service.js` (has `getWhitelistedPhones`, `addPhoneToWhitelist`, `removePhoneFromWhitelist`)
- **Backend Routes**: `backend/routes/verification.js`
- **Backend Service**: `backend/services/VerificationService.js`

---

## Support

For complete verification system documentation, see: `PHONE_VERIFICATION_GUIDE.md`

For quick setup, see: `VERIFICATION_QUICK_SETUP.md`

---

**Admin Dashboard Version**: 1.0.0  
**Status**: ✅ Ready  
**Last Updated**: 2025-01-01
