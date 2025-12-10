"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { apiService } from '@/lib/api';

const AuthContext = createContext();

const defaultContextValue = {
  user: null,
  loading: false,
  error: null,
  logout: () => {},
  updateForcedNumber: async () => {},
  updateBirthYear: async () => {},
  isAuthenticated: false
};

export function AuthProvider({ children }) {
  // Check localStorage immediately for faster initial render
  const getInitialUser = () => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const [user, setUser] = useState(getInitialUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get Firebase ID token
          const token = await firebaseUser.getIdToken();
          
          // Save token for API calls
          apiService.saveToken(token);
          localStorage.setItem('calculator_token', token);
          localStorage.setItem('user', JSON.stringify({
            uid: firebaseUser.uid,
            phoneNumber: firebaseUser.phoneNumber,
            displayName: firebaseUser.displayName || null,
          }));

          // Try to get user data from backend
          let userData = {
            uid: firebaseUser.uid,
            phoneNumber: firebaseUser.phoneNumber,
            displayName: firebaseUser.displayName || null,
            forcedNumber: null,
            secondForceNumber: null,
            secondForceTriggerNumber: null,
            birthYear: null,
          };

          try {
            const backendUser = await apiService.getCurrentUser();
            if (backendUser && backendUser.user) {
              userData = {
                ...userData,
                forcedNumber: backendUser.user.forcedNumber || null,
                secondForceNumber: backendUser.user.secondForceNumber || null,
                secondForceTriggerNumber: backendUser.user.secondForceTriggerNumber || null,
                birthYear: backendUser.user.birthYear || null,
              };
            }
          } catch (backendError) {
            console.log('Backend not available, using local data');
            // Load from localStorage as fallback
            const storedData = localStorage.getItem('userData');
            if (storedData) {
              try {
                const parsed = JSON.parse(storedData);
                userData.forcedNumber = parsed.forcedNumber || null;
                userData.secondForceNumber = parsed.secondForceNumber || null;
                userData.secondForceTriggerNumber = parsed.secondForceTriggerNumber || null;
                userData.birthYear = parsed.birthYear || null;
              } catch (e) {}
            }
          }

          setUser(userData);
        } catch (error) {
          console.error('Error getting user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
        apiService.removeToken();
        localStorage.removeItem('calculator_token');
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
      apiService.removeToken();
      localStorage.removeItem('calculator_token');
      localStorage.removeItem('user');
      localStorage.removeItem('userData');
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
    }
  };

  const updateForcedNumber = async (forcedNumbers) => {
    try {
      setError(null);
      
      // Update local state immediately
      setUser(prev => ({ 
        ...prev, 
        forcedNumber: forcedNumbers.forcedNumber,
        secondForceNumber: forcedNumbers.secondForceNumber,
        secondForceTriggerNumber: forcedNumbers.secondForceTriggerNumber
      }));
      
      // Persist to localStorage
      const storedData = localStorage.getItem('userData');
      const userData = storedData ? JSON.parse(storedData) : {};
      userData.forcedNumber = forcedNumbers.forcedNumber;
      userData.secondForceNumber = forcedNumbers.secondForceNumber;
      userData.secondForceTriggerNumber = forcedNumbers.secondForceTriggerNumber;
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Try to save to backend
      try {
        await apiService.updateForcedNumber(forcedNumbers);
      } catch (backendError) {
        console.log('Backend not available, saved locally');
      }
      
      return forcedNumbers;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateBirthYear = async (birthYear) => {
    try {
      setError(null);
      
      // Update local state immediately
      setUser(prev => ({ 
        ...prev, 
        birthYear: birthYear
      }));
      
      // Persist to localStorage
      const storedData = localStorage.getItem('userData');
      const userData = storedData ? JSON.parse(storedData) : {};
      userData.birthYear = birthYear;
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Try to save to backend
      try {
        await apiService.updateBirthYear(birthYear);
      } catch (backendError) {
        console.log('Backend not available, saved locally');
      }
      
      return { birthYear };
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      logout,
      updateForcedNumber,
      updateBirthYear,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    return defaultContextValue;
  }
  return context;
}
