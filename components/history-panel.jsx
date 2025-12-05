import React from 'react';

const HistoryPanel = ({ history, onClose, onClear }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-black rounded-t-[20px] sm:rounded-[20px] w-full sm:max-w-md max-h-[90vh] flex flex-col shadow-2xl border border-[#2C2C2E]">
        
        {/* Header with Logo */}
        <div className="flex flex-col items-center pt-6 pb-6 px-6">
          <img 
            src="/sandeep.png" 
            alt="Sandeep Fradian" 
            className="w-64 h-auto"
          />
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {history.length === 0 ? (
            <div className="text-center py-16 text-[#6C6C70]">No history yet</div>
          ) : (
            <div className="space-y-6">
              {history.map((entry, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-white text-7xl font-bold tracking-tight">{entry.result}</div>
                  {entry.forced && (
                    <div className="text-[#6C6C70] text-sm mt-1">(forced)</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear Button */}
        <div className="p-6 pt-4">
          <button
            onClick={onClear}
            className="w-full bg-transparent border-2 border-white text-white font-medium py-4 rounded-xl transition-all hover:bg-white/10 text-lg"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;