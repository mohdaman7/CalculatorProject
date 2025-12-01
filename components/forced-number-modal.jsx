"use client"

import { useState } from "react"

export default function ForcedNumberModal({ currentValue, onSave, onClose }) {
  const [formData, setFormData] = useState({
    forcedNumber: currentValue?.forcedNumber ? String(currentValue.forcedNumber) : "",
    secondForceNumber: currentValue?.secondForceNumber ? String(currentValue.secondForceNumber) : "",
    secondForceTriggerNumber: currentValue?.secondForceTriggerNumber ? String(currentValue.secondForceTriggerNumber) : ""
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    const data = {}
    if (formData.forcedNumber.trim()) data.forcedNumber = Number.parseFloat(formData.forcedNumber)
    else data.forcedNumber = null
    
    if (formData.secondForceNumber.trim()) data.secondForceNumber = Number.parseFloat(formData.secondForceNumber)
    else data.secondForceNumber = null
    
    if (formData.secondForceTriggerNumber.trim()) data.secondForceTriggerNumber = Number.parseFloat(formData.secondForceTriggerNumber)
    else data.secondForceTriggerNumber = null
    
    onSave(data)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">Forced Number Settings</h2>
        
        <div className="space-y-4">
          {/* Main Forced Number */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Forcing Number
            </label>
            <p className="text-gray-400 text-xs mb-2">
              Shows for any addition/subtraction operation
            </p>
            <input
              type="number"
              value={formData.forcedNumber}
              onChange={(e) => handleInputChange('forcedNumber', e.target.value)}
              placeholder="Enter forcing number"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Second Force Number */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Second Force Number
            </label>
            <p className="text-gray-400 text-xs mb-2">
              Shows when trigger number is detected
            </p>
            <input
              type="number"
              value={formData.secondForceNumber}
              onChange={(e) => handleInputChange('secondForceNumber', e.target.value)}
              placeholder="Enter second force number"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Second Force Trigger Number */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Second Force Trigger Number
            </label>
            <p className="text-gray-400 text-xs mb-2">
              If this number appears in addition/subtraction, show second force number
            </p>
            <input
              type="number"
              value={formData.secondForceTriggerNumber}
              onChange={(e) => handleInputChange('secondForceTriggerNumber', e.target.value)}
              placeholder="Enter trigger number"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
