"use client"

export default function Display({ value, forcedNumber }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <div className="text-right">
        {forcedNumber !== null && <div className="text-sm text-amber-500 mb-2">Forced: {forcedNumber}</div>}
        <div className="text-white text-5xl font-light break-words">{value}</div>
      </div>
    </div>
  )
}
