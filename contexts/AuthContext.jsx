"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { apiService } from '@/lib/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
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
  }, [])

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

  const updateForcedNumber = async (forcedNumber) => {
    try {
      setError(null)
      const data = await apiService.updateForcedNumber(forcedNumber)
      setUser(prev => ({ ...prev, forcedNumber: data.forcedNumber }))
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
  if (!context) {
    throw new error('useAuth must be used within an AuthProvider')
  }
  return context
}
