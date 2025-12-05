"use client"

import { useState, useEffect } from "react"
import Calculator from "@/components/calculator"
import HistoryPanel from "@/components/history-panel"
import ForcedNumberModal from "@/components/forced-number-modal"
import AuthModal from "@/components/auth-modal"
import { useAuth } from "@/contexts/AuthContext"
import { apiService } from "@/lib/api"

export default function HomeWrapper() {
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [showForcedModal, setShowForcedModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [forcedNumber, setForcedNumber] = useState(null)
  const [syncStatus, setSyncStatus] = useState('offline')
  const { user, isAuthenticated, updateForcedNumber, loading } = useAuth()

  // Load from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("calculatorHistory")
    const savedForcedNumber = localStorage.getItem("forcedNumber")

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
    if (savedForcedNumber) {
      setForcedNumber(JSON.parse(savedForcedNumber))
    }

    // Set forced number from user profile if authenticated
    if (isAuthenticated && user) {
      setForcedNumber({
        forcedNumber: user.forcedNumber,
        secondForceNumber: user.secondForceNumber,
        secondForceTriggerNumber: user.secondForceTriggerNumber
      })
    }
  }, [isAuthenticated, user, loading])

  // Save to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem("calculatorHistory", JSON.stringify(history))
  }, [history])

  // Save to localStorage whenever forcedNumber changes
  useEffect(() => {
    localStorage.setItem("forcedNumber", JSON.stringify(forcedNumber))
  }, [forcedNumber])

  // Sync with backend when online and authenticated
  useEffect(() => {
    if (isAuthenticated && navigator.onLine && !loading) {
      syncWithBackend()
    }
  }, [isAuthenticated, loading])

  const syncWithBackend = async () => {
    try {
      setSyncStatus('syncing')
      
      // Get offline calculations that haven't been synced
      const offlineHistory = history.filter(item => !item.synced)
      
      if (offlineHistory.length > 0) {
        const calculationsToSync = offlineHistory.map(item => ({
          expression: item.expression,
          actualResult: item.actualResult || item.result,
          forcedResult: item.forced ? item.result : null,
          wasForced: item.forced,
          operationType: getOperationType(item.expression),
          deviceId: getDeviceId()
        }))

        await apiService.syncCalculations(calculationsToSync)
        
        // Mark as synced
        const updatedHistory = history.map(item => ({
          ...item,
          synced: true
        }))
        setHistory(updatedHistory)
      }

      // Load latest history from backend
      const backendHistory = await apiService.getHistory({ forcedOnly: true })
      const formattedHistory = backendHistory.history.map(item => ({
        id: item._id,
        expression: item.expression,
        result: item.forcedResult || item.actualResult,
        timestamp: new Date(item.createdAt).toLocaleString(),
        forced: item.wasForced,
        synced: true
      }))

      // Merge with local history (avoid duplicates)
      const mergedHistory = [...formattedHistory, ...history.filter(local => 
        !formattedHistory.some(backend => backend.expression === local.expression)
      )]
      setHistory(mergedHistory.slice(0, 100)) // Keep only last 100 items

      setSyncStatus('online')
    } catch (error) {
      console.error('Sync failed:', error)
      setSyncStatus('offline')
    }
  }

  const getOperationType = (expression) => {
    if (expression.includes('+')) return 'addition'
    if (expression.includes('-')) return 'subtraction'
    if (expression.includes('×')) return 'multiplication'
    if (expression.includes('÷')) return 'division'
    return 'mixed'
  }

  const getDeviceId = () => {
    let deviceId = localStorage.getItem('deviceId')
    if (!deviceId) {
      deviceId = 'device_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('deviceId', deviceId)
    }
    return deviceId
  }

  const handleAddToHistory = async (entry) => {
    const newEntry = { ...entry, id: Date.now(), synced: false }
    setHistory([newEntry, ...history])

    // Save to backend if authenticated and it was a forced calculation
    if (isAuthenticated && entry.forced) {
      try {
        await apiService.saveCalculation({
          expression: entry.expression,
          actualResult: entry.result, // Will be calculated correctly in backend
          forcedResult: entry.result,
          wasForced: entry.forced,
          operationType: getOperationType(entry.expression),
          deviceId: getDeviceId()
        })
        
        // Mark as synced
        setHistory(prev => prev.map(item => 
          item.id === newEntry.id ? { ...item, synced: true } : item
        ))
      } catch (error) {
        console.error('Failed to save to backend:', error)
        // Keep it marked as unsynced for later sync
      }
    }
  }

  const handleClearHistory = async () => {
    setHistory([])
    
    // Clear from backend if authenticated
    if (isAuthenticated) {
      try {
        await apiService.clearHistory(getDeviceId())
      } catch (error) {
        console.error('Failed to clear backend history:', error)
      }
    }
  }

  const handleSetForcedNumber = async (forcedNumbers) => {
    setForcedNumber(forcedNumbers)
    setShowForcedModal(false)

    // Update backend if authenticated
    if (isAuthenticated) {
      try {
        await updateForcedNumber(forcedNumbers)
      } catch (error) {
        console.error('Failed to update forced numbers in backend:', error)
      }
    }
  }

  const handleClearForcedNumber = async () => {
    setForcedNumber({
      forcedNumber: null,
      secondForceNumber: null,
      secondForceTriggerNumber: null
    })

    // Update backend if authenticated
    if (isAuthenticated) {
      try {
        await updateForcedNumber({
          forcedNumber: null,
          secondForceNumber: null,
          secondForceTriggerNumber: null
        })
      } catch (error) {
        console.error('Failed to clear forced numbers in backend:', error)
      }
    }
  }

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-black p-4">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </main>
    )
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
