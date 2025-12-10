"use client"

import { useState, useEffect } from "react"
import Calculator from "@/components/calculator"
import HistoryPanel from "@/components/history-panel"
import ForcedNumberModal from "@/components/forced-number-modal"
import BirthYearModal from "@/components/birth-year-modal"
import AuthModal from "@/components/auth-modal"
import VerificationPage from "@/components/verification-page"
import { useAuth } from "@/contexts/AuthContext"
import { apiService } from "@/lib/api"

export default function HomeWrapper() {
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [showForcedModal, setShowForcedModal] = useState(false)
  const [showBirthYearModal, setShowBirthYearModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [forcedNumber, setForcedNumber] = useState(null)
  const [birthYearLoading, setBirthYearLoading] = useState(false)
  const [lastPincodeAddress, setLastPincodeAddress] = useState(null)
  const { user, isAuthenticated, updateForcedNumber, loading } = useAuth()

  // Load from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      const savedHistory = localStorage.getItem("calculatorHistory")
      const savedForcedNumber = localStorage.getItem("forcedNumber")

      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory))
        } catch (e) {
          console.error('Failed to parse history:', e)
        }
      }
      if (savedForcedNumber) {
        try {
          setForcedNumber(JSON.parse(savedForcedNumber))
        } catch (e) {
          console.error('Failed to parse forcedNumber:', e)
        }
      }

      // Load forced numbers from user profile if authenticated
      if (isAuthenticated && user) {
        if (user.forcedNumber || user.secondForceNumber || user.secondForceTriggerNumber) {
          setForcedNumber({
            forcedNumber: user.forcedNumber,
            secondForceNumber: user.secondForceNumber,
            secondForceTriggerNumber: user.secondForceTriggerNumber
          })
        }
      }
    }

    loadData()
  }, [isAuthenticated, user])

  // Save to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem("calculatorHistory", JSON.stringify(history))
  }, [history])

  // Save to localStorage whenever forcedNumber changes
  useEffect(() => {
    localStorage.setItem("forcedNumber", JSON.stringify(forcedNumber))
  }, [forcedNumber])

  const getDeviceId = () => {
    if (typeof window === 'undefined') return 'unknown'
    let deviceId = localStorage.getItem('deviceId')
    if (!deviceId) {
      deviceId = 'device_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('deviceId', deviceId)
    }
    return deviceId
  }

  const getOperationType = (expression) => {
    if (expression.includes('+')) return 'addition'
    if (expression.includes('-')) return 'subtraction'
    if (expression.includes('×')) return 'multiplication'
    if (expression.includes('÷')) return 'division'
    return 'mixed'
  }

  const handleAddToHistory = async (entry) => {
    const newEntry = { ...entry, id: Date.now(), synced: false }
    setHistory(prev => [newEntry, ...prev].slice(0, 100))

    // Try to save to backend if authenticated
    if (isAuthenticated) {
      try {
        const payload = {
          expression: entry.expression,
          actualResult: entry.actualResult || entry.result,
          forcedResult: entry.forced ? entry.result : null,
          wasForced: entry.forced,
          operationType: entry.operationType || getOperationType(entry.expression),
          deviceId: getDeviceId()
        }

        if (entry.operationType === 'age_calculation') {
          payload.year = entry.year
          payload.age = entry.age
        }

        if (entry.pincode) {
          payload.pincode = entry.pincode
          payload.addressTaluk = entry.addressTaluk
          payload.addressDistrict = entry.addressDistrict
          payload.addressState = entry.addressState
        }

        await apiService.saveCalculation(payload)
        
        setHistory(prev => prev.map(item => 
          item.id === newEntry.id ? { ...item, synced: true } : item
        ))
      } catch (error) {
        console.log('Backend not available, saved locally')
      }
    }
  }

  const handleBirthYearSubmit = (birthYear) => {
    setBirthYearLoading(true)
    try {
      const currentYear = new Date().getFullYear()
      const age = currentYear - birthYear

      const ageEntry = {
        expression: `Age from ${birthYear}`,
        result: age,
        actualResult: age,
        timestamp: new Date().toLocaleString(),
        forced: false,
        operationType: 'age_calculation',
        year: birthYear,
        age: age
      }

      handleAddToHistory(ageEntry)
      setShowBirthYearModal(false)
    } catch (error) {
      console.error('Failed to save birth year:', error)
    } finally {
      setBirthYearLoading(false)
    }
  }

  const handleClearHistory = async () => {
    setHistory([])
    localStorage.removeItem("calculatorHistory")
    
    // Try to clear from backend
    if (isAuthenticated) {
      try {
        await apiService.clearHistory(getDeviceId())
      } catch (error) {
        console.log('Backend not available')
      }
    }
  }

  const handleSetForcedNumber = (forcedNumbers) => {
    setForcedNumber(forcedNumbers)
    setShowForcedModal(false)
    
    // Also update in AuthContext for persistence
    if (isAuthenticated) {
      updateForcedNumber(forcedNumbers)
    }
  }

  const handleClearForcedNumber = () => {
    const clearedNumbers = {
      forcedNumber: null,
      secondForceNumber: null,
      secondForceTriggerNumber: null
    }
    setForcedNumber(clearedNumbers)
    
    if (isAuthenticated) {
      updateForcedNumber(clearedNumbers)
    }
  }

  // Handle pincode address update (called after background fetch)
  const handlePincodeAddress = (pincodeData) => {
    setLastPincodeAddress(pincodeData)
    
    // Update the most recent history entry with this pincode
    setHistory(prev => {
      const updated = [...prev]
      // Find the most recent entry with this pincode but no address
      const idx = updated.findIndex(entry => 
        entry.pincode === pincodeData.pincode && !entry.addressTaluk
      )
      if (idx !== -1) {
        updated[idx] = {
          ...updated[idx],
          addressTaluk: pincodeData.addressTaluk,
          addressDistrict: pincodeData.addressDistrict,
          addressState: pincodeData.addressState
        }
      }
      return updated
    })
  }

  // Show verification page only if definitely not authenticated (loading complete and no user)
  if (!loading && !isAuthenticated) {
    return <VerificationPage onVerificationComplete={() => {}} />
  }

  return (
    <main className="bg-black">
      <div className="relative">
        <Calculator
          onAddToHistory={handleAddToHistory}
          onOpenHistory={() => setShowHistory(true)}
          onOpenForcedModal={() => setShowForcedModal(true)}
          forcedNumber={forcedNumber}
          onClearForcedNumber={handleClearForcedNumber}
          onPincodeAddress={handlePincodeAddress}
        />

        {showHistory && (
          <HistoryPanel 
            history={history} 
            onClose={() => setShowHistory(false)} 
            onClear={handleClearHistory} 
          />
        )}

        {showForcedModal && (
          <ForcedNumberModal
            currentValue={forcedNumber}
            onSave={handleSetForcedNumber}
            onClose={() => setShowForcedModal(false)}
            pincodeAddress={lastPincodeAddress}
          />
        )}

        {showBirthYearModal && (
          <BirthYearModal
            isOpen={showBirthYearModal}
            onClose={() => setShowBirthYearModal(false)}
            onSubmit={handleBirthYearSubmit}
            initialYear={user?.birthYear}
            isLoading={birthYearLoading}
          />
        )}

        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </div>
    </main>
  )
}
