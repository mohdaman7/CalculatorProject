"use client"

export default function Display({ value, forcedNumber }) {
  return (
    <div className="bg-black rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-4 sm:mb-6 text-right">
      {forcedNumber !== null && (
        <div className="text-xs sm:text-sm text-orange-500 font-medium mb-2 sm:mb-3 opacity-80">
          Forced: {forcedNumber}
        </div>
      )}
      <div className="text-4xl sm:text-5xl md:text-7xl text-white font-light tracking-tight break-words word-break">
        {value}
      </div>
    </div>
  )
}
