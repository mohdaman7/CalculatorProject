"use client"

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '@/firebase';
import { Phone, Shield, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', maxLength: 10 },
  { code: '+1', country: 'USA', flag: '🇺🇸', maxLength: 10 },
  { code: '+44', country: 'UK', flag: '🇬🇧', maxLength: 10 },
  { code: '+971', country: 'UAE', flag: '🇦🇪', maxLength: 9 },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', maxLength: 9 },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', maxLength: 8 },
  { code: '+61', country: 'Australia', flag: '🇦🇺', maxLength: 9 },
  { code: '+49', country: 'Germany', flag: '🇩🇪', maxLength: 11 },
  { code: '+33', country: 'France', flag: '🇫🇷', maxLength: 9 },
  { code: '+81', country: 'Japan', flag: '🇯🇵', maxLength: 10 },
];

const VerificationPage = ({ onVerificationComplete }) => {
  const [step, setStep] = useState('phone');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [expiresIn, setExpiresIn] = useState(0);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const clearRecaptcha = useCallback(() => {
    setRecaptchaReady(false);
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {}
      window.recaptchaVerifier = null;
    }
    const container = document.getElementById('recaptcha-container');
    if (container) {
      container.innerHTML = '';
    }
  }, []);

  const initializeRecaptcha = useCallback(async () => {
    if (typeof window === 'undefined') return null;
    
    clearRecaptcha();

    await new Promise(resolve => setTimeout(resolve, 200));

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: () => {
          console.log('reCAPTCHA verified');
          setRecaptchaReady(true);
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          setRecaptchaReady(false);
        }
      });
      
      await window.recaptchaVerifier.render();
      return window.recaptchaVerifier;
    } catch (err) {
      console.error('RecaptchaVerifier init error:', err);
      return null;
    }
  }, [clearRecaptcha]);

  useEffect(() => {
    initializeRecaptcha();
    
    return () => {
      clearRecaptcha();
    };
  }, [clearRecaptcha, initializeRecaptcha]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, selectedCountry.maxLength);
    setPhoneNumber(value);
    setError('');
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!phoneNumber.trim() || phoneNumber.length < 6) {
        setError('Please enter a valid phone number');
        setLoading(false);
        return;
      }

      const formattedPhone = selectedCountry.code + phoneNumber;

      if (!window.recaptchaVerifier) {
        setError('Please complete the reCAPTCHA first.');
        setLoading(false);
        return;
      }

      const result = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      
      setConfirmationResult(result);
      setStep('otp');
      setOtp(['', '', '', '', '', '']);
      setExpiresIn(120);
      startCountdown(120);
    } catch (err) {
      console.error('Error requesting OTP:', err);
      
      clearRecaptcha();
      
      if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number format');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Try again later.');
      } else if (err.code === 'auth/quota-exceeded') {
        setError('SMS quota exceeded. Try again later.');
      } else if (err.code === 'auth/captcha-check-failed') {
        setError('Verification failed. Please try again.');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const startCountdown = (seconds) => {
    let remaining = seconds;
    const interval = setInterval(() => {
      remaining--;
      setExpiresIn(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length === 6) {
      setOtp(pastedData.split(''));
      document.getElementById('otp-5')?.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const otpValue = otp.join('');

    try {
      if (otpValue.length !== 6) {
        setError('Please enter the complete 6-digit code');
        setLoading(false);
        return;
      }

      if (!confirmationResult) {
        setError('Session expired. Please request a new code.');
        setLoading(false);
        setStep('phone');
        return;
      }

      const userCredential = await confirmationResult.confirm(otpValue);
      const user = userCredential.user;
      const token = await user.getIdToken();

      const userData = {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        displayName: user.displayName || null,
      };

      localStorage.setItem('calculator_token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      onVerificationComplete(userData, token);
    } catch (err) {
      console.error('Error verifying OTP:', err);
      
      if (err.code === 'auth/invalid-verification-code') {
        setError('Invalid code. Please check and try again.');
      } else if (err.code === 'auth/code-expired') {
        setError('Code expired. Please request a new one.');
      } else {
        setError('Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp(['', '', '', '', '', '']);
    setError('');
    setConfirmationResult(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMaskedPhone = () => {
    if (!phoneNumber) return '';
    return selectedCountry.code + ' ' + '•'.repeat(phoneNumber.length - 4) + phoneNumber.slice(-4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex flex-col items-center justify-center p-4">
      


      {/* Main Card */}
      <div className="w-full max-w-sm">
        {step === 'phone' ? (
          <div className="animate-slide-up">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-white mb-2">Welcome</h1>
              <p className="text-zinc-500 text-sm">
                Enter your phone number to continue
              </p>
            </div>

            {/* Phone Input Card */}
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 border border-zinc-800/50 shadow-2xl">
              <form onSubmit={handleRequestOTP} className="space-y-5">
                {/* Country Selector */}
                <div className="relative">
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">
                    Country
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCountryPicker(!showCountryPicker)}
                    className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3.5 flex items-center justify-between text-white hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{selectedCountry.flag}</span>
                      <span className="font-medium">{selectedCountry.country}</span>
                      <span className="text-zinc-500">{selectedCountry.code}</span>
                    </div>
                    <svg className={`w-5 h-5 text-zinc-500 transition-transform ${showCountryPicker ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Country Dropdown */}
                  {showCountryPicker && (
                    <div className="absolute z-50 w-full mt-2 bg-zinc-900 border border-zinc-700/50 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                      {COUNTRY_CODES.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setShowCountryPicker(false);
                            setPhoneNumber('');
                          }}
                          className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-zinc-800 transition-colors ${
                            selectedCountry.code === country.code ? 'bg-zinc-800' : ''
                          }`}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span className="text-white font-medium">{country.country}</span>
                          <span className="text-zinc-500 ml-auto">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Number Input */}
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-zinc-400">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">{selectedCountry.code}</span>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder={`${'0'.repeat(selectedCountry.maxLength)}`}
                      className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl pl-24 pr-4 py-3.5 text-white text-lg font-medium placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      disabled={loading}
                      autoFocus
                    />
                  </div>
                  <p className="text-zinc-600 text-xs mt-2 text-right">
                    {phoneNumber.length}/{selectedCountry.maxLength} digits
                  </p>
                </div>

                {/* reCAPTCHA Widget */}
                <div className="flex flex-col items-center gap-3">
                  <p className="text-zinc-500 text-xs">Complete verification to continue</p>
                  <div id="recaptcha-container" className="flex justify-center"></div>
                  {recaptchaReady && (
                    <div className="flex items-center gap-2 text-green-500 text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 text-sm">{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || phoneNumber.length < 6 || !recaptchaReady}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold py-4 rounded-xl hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Get Verification Code</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Footer Text */}
            <p className="text-zinc-600 text-xs text-center mt-6">
              Complete the reCAPTCHA, then click the button
            </p>
          </div>
        ) : (
          <div className="animate-slide-up">
            {/* Back Button */}
            <button
              onClick={handleBackToPhone}
              disabled={loading}
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-amber-500" />
              </div>
              <h1 className="text-2xl font-semibold text-white mb-2">Verification</h1>
              <p className="text-zinc-500 text-sm">
                Enter the code sent to
              </p>
              <p className="text-amber-500 font-medium mt-1">{getMaskedPhone()}</p>
            </div>

            {/* OTP Input Card */}
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 border border-zinc-800/50 shadow-2xl">
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                {/* OTP Input Boxes */}
                <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`w-12 h-14 bg-zinc-800/50 border rounded-xl text-center text-2xl font-bold text-white focus:outline-none transition-all ${
                        digit 
                          ? 'border-amber-500/50 ring-2 ring-amber-500/20' 
                          : 'border-zinc-700/50 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20'
                      }`}
                      disabled={loading}
                    />
                  ))}
                </div>

                {/* Timer */}
                <div className="flex justify-center">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    expiresIn <= 30 ? 'bg-red-500/10 text-red-400' : 'bg-zinc-800/50 text-zinc-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      expiresIn <= 30 ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
                    }`}></div>
                    <span className="text-sm font-medium">
                      {expiresIn > 0 ? `Expires in ${formatTime(expiresIn)}` : 'Code expired'}
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 text-sm">{error}</span>
                  </div>
                )}

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={loading || otp.join('').length !== 6}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold py-4 rounded-xl hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Verify & Continue</span>
                    </>
                  )}
                </button>

                {/* Resend Link */}
                <div className="text-center">
                  <p className="text-zinc-600 text-sm">
                    Didn't receive the code?{' '}
                    <button
                      type="button"
                      onClick={handleBackToPhone}
                      disabled={loading}
                      className="text-amber-500 hover:text-amber-400 font-medium transition-colors disabled:opacity-50"
                    >
                      Resend
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom Badge */}
      <div className="mt-8 flex items-center gap-2 text-zinc-600 text-xs">
        <Shield className="w-3.5 h-3.5" />
        <span>Secured by Firebase</span>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VerificationPage;
