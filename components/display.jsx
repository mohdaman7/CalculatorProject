"use client"

export default function Display({ value, forcedNumber }) {
  const getActiveForcedNumber = () => {
    if (!forcedNumber) return null
    if (forcedNumber.secondForceNumber !== null && forcedNumber.secondForceTriggerNumber !== null) {
      return forcedNumber.secondForceNumber
    }
    return forcedNumber.forcedNumber
  }

  const activeForcedNumber = getActiveForcedNumber()

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <div className="text-right">
        {activeForcedNumber !== null && (
          <div className="text-sm text-amber-500 mb-2">Forced: {activeForcedNumber}</div>
        )}
        <div className="text-white text-5xl font-light break-words">{value}</div>
      </div>
    </div>
  )
}
