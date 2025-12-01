"use client"

export default function HistoryPanel({ history, onClose, onClear }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md max-h-96 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">History</h2>
          <button onClick={onClear} className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
            Clear
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {history.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No history yet</p>
          ) : (
            history.map((entry, idx) => (
              <div key={idx} className="bg-gray-800 p-3 rounded">
                <div className="text-gray-300 text-sm">{entry.expression}</div>
                <div className="text-amber-500 font-semibold mt-1">
                  = {entry.result}
                  {entry.forced && " (forced)"}
                </div>
                <div className="text-gray-500 text-xs mt-1">{entry.timestamp}</div>
              </div>
            ))
          )}
        </div>

        <button onClick={onClose} className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg">
          Close
        </button>
      </div>
    </div>
  )
}
