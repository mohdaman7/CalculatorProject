import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPv7Fn86vnPM_Br2PiDD6yIZgGdnvbsn8",
  authDomain: "calculator-49f7a.firebaseapp.com",
  projectId: "calculator-49f7a",
  storageBucket: "calculator-49f7a.firebasestorage.app",
  messagingSenderId: "990187587172",
  appId: "1:990187587172:web:e8dba562e68465ecc9c171",
  measurementId: "G-ZKWT0R0QRL"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

auth.settings.appVerificationDisabledForTesting = process.env.NODE_ENV === 'development';

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
