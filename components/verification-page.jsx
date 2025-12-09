"use client"

import { useState } from 'react';
import Image from 'next/image';

const VerificationPage = ({ onVerificationComplete }) => {
  const [step, setStep] = useState('phone'); // phone or otp
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [maskedPhone, setMaskedPhone] = useState('');
  const [expiresIn, setExpiresIn] = useState(0);
  const [attempts, setAttempts] = useState(5);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate phone format
      if (!phoneNumber.trim()) {
        setError('Please enter your phone number');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/verification/request-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumber.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setMaskedPhone(data.phoneNumber);
        setExpiresIn(data.expiresIn);
        setStep('otp');
        setOtp('');
        setAttempts(5);
        
        // Start countdown timer
        startCountdown(data.expiresIn);
      } else {
        setError(data.error || 'Failed to request OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Error requesting OTP:', err);
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

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!otp.trim()) {
        setError('Please enter the OTP');
        setLoading(false);
        return;
      }

      if (otp.length !== 6) {
        setError('OTP must be 6 digits');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/verification/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          otp: otp.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Save token
        localStorage.setItem('calculator_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Call completion callback
        onVerificationComplete(data.user, data.token);
      } else {
        setError(data.error || 'Invalid OTP. Please try again.');
        // Extract attempts from error message if available
        const attemptsMatch = data.error?.match(/(\d+)/);
        if (attemptsMatch) {
          setAttempts(parseInt(attemptsMatch[1]));
        }
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Error verifying OTP:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
    setError('');
    setAttempts(5);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-12">
        <Image
          src="/sandeep.png"
          alt="Logo"
          width={200}
          height={80}
          className="h-20 w-auto"
        />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-[#1c1c1c] rounded-3xl p-8 border border-[#333]">
        
        {step === 'phone' ? (
          <>
            {/* Verification Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-white mb-2">Verification</h1>
              <p className="text-gray-400 text-sm">
                Please request a verification code to access the application
              </p>
            </div>

            {/* Phone Input Form */}
            <form onSubmit={handleRequestOTP} className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-3">
                  Enter Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setError('');
                  }}
                  placeholder="(123) 456-7890"
                  className="w-full bg-[#333] text-white px-4 py-3 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#FF9F0A] placeholder-gray-500"
                  disabled={loading}
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !phoneNumber.trim()}
                className="w-full bg-[#FF9F0A] text-black py-3 rounded-lg font-medium hover:bg-[#FFB340] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Requesting Code...
                  </>
                ) : (
                  'Request Code'
                )}
              </button>

              <p className="text-gray-500 text-xs text-center">
                Only registered phone numbers can access this calculator
              </p>
            </form>
          </>
        ) : (
          <>
            {/* OTP Verification Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-white mb-2">Enter Code</h1>
              <p className="text-gray-400 text-sm">
                We've sent a 6-digit code to {maskedPhone}
              </p>
            </div>

            {/* OTP Input Form */}
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-3">
                  Enter OTP Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                    setError('');
                  }}
                  placeholder="000000"
                  maxLength="6"
                  className="w-full bg-[#333] text-white px-4 py-4 rounded-lg text-center text-4xl font-light tracking-widest focus:outline-none focus:ring-2 focus:ring-[#FF9F0A] placeholder-gray-500"
                  disabled={loading}
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Timer and Attempts */}
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>
                  Expires in: <span className="text-[#FF9F0A] font-medium">{formatTime(expiresIn)}</span>
                </span>
                <span>
                  Attempts left: <span className="text-[#FF9F0A] font-medium">{attempts}</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-[#FF9F0A] text-black py-3 rounded-lg font-medium hover:bg-[#FFB340] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={handleBackToPhone}
                disabled={loading}
                className="w-full bg-transparent border border-gray-600 text-gray-400 py-2 rounded-lg text-sm hover:border-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50"
              >
                Use Different Number
              </button>

              {/* Request New Code Link */}
              <div className="text-center">
                <p className="text-gray-500 text-xs">
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-[#FF9F0A] hover:text-[#FFB340] font-medium"
                  >
                    Request again
                  </button>
                </p>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-xs max-w-md">
        <p>This calculator is restricted to registered users only.</p>
        <p className="mt-2">Contact the administrator for access.</p>
      </div>
    </div>
  );
};

export default VerificationPage;
