const admin = require('firebase-admin');

// Initialize Firebase Admin
// You can use service account or just project ID for ID token verification
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'calculator-49f7a'
  });
}

module.exports = admin;
