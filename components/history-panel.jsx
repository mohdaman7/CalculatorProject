"use client"

const HistoryPanel = ({ history, onClose, onClear }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-[#1C1C1E] rounded-t-[20px] sm:rounded-[20px] w-full sm:max-w-md max-h-[90vh] flex flex-col">
        {/* Header with Logo */}
        <div className="flex flex-col items-center pt-8 pb-4 px-6 border-b border-[#38383A]">
          <div className="w-24 h-24 mb-3 flex items-center justify-center">
            <div className="text-[#98989D] font-serif text-center">
              <div className="text-xl tracking-wider">ART OF</div>
              <div className="text-2xl font-bold tracking-wide">MENTALISM</div>
              <div className="text-[8px] mt-1">BY SANDEEP FRADIAN</div>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4">
          {history.length === 0 ? (
            <div className="text-center py-16 text-[#98989D]">No history yet</div>
          ) : (
            <div className="space-y-0">
              {history.map((entry, idx) => (
                <div key={idx} className="border-b border-[#38383A] last:border-b-0">
                  <div className="py-4 text-center">
                    <div className="text-white text-6xl font-light mb-1">{entry.result}</div>
                    {entry.forced && (
                      <div className="text-[#98989D] text-xs">(forced)</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear Button */}
        <div className="p-4 border-t border-[#38383A]">
          <button
            onClick={onClear}
            className="w-full bg-[#FF3B30] hover:bg-[#FF4F44] text-white font-semibold py-3 rounded-xl transition-colors mb-2"
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className="w-full bg-[#2C2C2E] hover:bg-[#38383A] text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;