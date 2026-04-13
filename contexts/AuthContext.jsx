"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { apiService } from '@/lib/api';
import { safeStorage } from '@/lib/safe-storage';

const AuthContext = createContext();

const defaultContextValue = {
  user: null,
  loading: false,
  error: null,
  logout: () => { },
  updateForcedNumber: async () => { },
  updateBirthYear: async () => { },
  isAuthenticated: false
};

export function AuthProvider({ children }) {
  // Check localStorage immediately for faster initial render
  const getInitialUser = () => {
    const stored = safeStorage.getItem('user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize from storage on mount
  useEffect(() => {
    const initializeSession = async () => {
      const token = safeStorage.getItem('calculator_token');
      const storedUser = safeStorage.getItem('user');

      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          apiService.saveToken(token);

          // Refresh profile from backend to ensure data is current
          const response = await apiService.getCurrentUser();
          if (response && response.user) {
            const updatedUser = {
              ...parsedUser,
              isAdmin: response.user.isAdmin || false,
              isSuperAdmin: response.user.isSuperAdmin || false,
              forcedNumber: response.user.forcedNumber || null,
              secondForceNumber: response.user.secondForceNumber || null,
              secondForceTriggerNumber: response.user.secondForceTriggerNumber || null,
              birthYear: response.user.birthYear || null,
            };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser)); // Keep for internal use or check if we should switch to safeStorage here too
            safeStorage.setItem('user', JSON.stringify(updatedUser));
          }
        } catch (e) {
          console.error('Failed to restore session:', e);
        }
      }
      setLoading(false);
    };

    initializeSession();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // If we already have a user in state (from JWT), don't let 
      // onAuthStateChanged (which might be null initially) clear it.
      if (!firebaseUser) {
        // Only clear if there's no custom token as well
        if (!safeStorage.getItem('calculator_token')) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        // Get Firebase ID token
        const token = await firebaseUser.getIdToken();

        // Save token for API calls
        apiService.saveToken(token);
        safeStorage.setItem('calculator_token', token);

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
              isAdmin: backendUser.user.isAdmin || false,
              isSuperAdmin: backendUser.user.isSuperAdmin || false,
              forcedNumber: backendUser.user.forcedNumber || null,
              secondForceNumber: backendUser.user.secondForceNumber || null,
              secondForceTriggerNumber: backendUser.user.secondForceTriggerNumber || null,
              birthYear: backendUser.user.birthYear || null,
            };
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } catch (backendError) {
          console.error('Failed to sync backend profile on Firebase change');
        }

        setUser(userData);
      } catch (error) {
        console.error('Error handling Firebase auth change:', error);
      } finally {
        setLoading(false);
      }
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
