"use client"

import { useState } from "react"

export default function ForcedNumberModal({ currentValue, onSave, onClose }) {
  const [inputValue, setInputValue] = useState(currentValue ? String(currentValue) : "")

  const handleSave = () => {
    if (inputValue.trim()) {
      onSave(Number.parseFloat(inputValue))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-white mb-4">Set Forced Number</h2>
        <p className="text-gray-300 text-sm mb-4">
          This value will override addition/subtraction results when using equals.
        </p>

        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter forced number"
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
          autoFocus
        />

        <div className="flex gap-3">
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
