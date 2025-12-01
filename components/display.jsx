"use client"

export default function Display({ value }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <div className="text-right">
        <div className="text-white text-5xl font-light break-words">{value}</div>
      </div>
    </div>
  )
}
