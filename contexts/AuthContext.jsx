"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { apiService } from '@/lib/api'

const AuthContext = createContext()

// Default context value for when AuthProvider is not available
const defaultContextValue = {
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateForcedNumber: async () => {},
  isAuthenticated: false
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const initAuth = async () => {
      if (apiService.isAuthenticated()) {
        try {
          const data = await apiService.getCurrentUser()
          setUser(data.user)
        } catch (error) {
          console.error('Failed to get current user:', error)
          apiService.logout()
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [mounted])

  const login = async (email, password) => {
    try {
      setError(null)
      setLoading(true)
      const data = await apiService.login({ email, password })
      setUser(data.user)
      return data
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (username, email, password) => {
    try {
      setError(null)
      setLoading(true)
      const data = await apiService.register({ username, email, password })
      setUser(data.user)
      return data
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    apiService.logout()
    setUser(null)
    setError(null)
  }

  const updateForcedNumber = async (forcedNumbers) => {
    try {
      setError(null)
      const data = await apiService.updateForcedNumber(forcedNumbers)
      setUser(prev => ({ 
        ...prev, 
        forcedNumber: data.forcedNumber,
        secondForceNumber: data.secondForceNumber,
        secondForceTriggerNumber: data.secondForceTriggerNumber
      }))
      return data
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateForcedNumber,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  // Return default context if AuthProvider is not available
  return context || defaultContextValue
}
