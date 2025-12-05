import React from 'react';

const HistoryPanel = ({ history, onClose, onClear }) => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
      
      {/* Header with Logo */}
      <div className="flex flex-col items-center pt-3 pb-6 px-6 flex-shrink-0">
        <img 
          src="/sandeep.png" 
          alt="Sandeep Fradian" 
          className="w-64 h-auto"
        />
      </div>

      {/* History List - Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        {history.length === 0 ? (
          <div className="text-center py-20 text-[#666] text-base">No history yet</div>
        ) : (
          <div className="space-y-6 pt-2">
            {history.map((entry, idx) => (
              <div key={idx} className="text-center">
                <div className="text-white text-4xl font-bold tracking-tight leading-none">
                  {Number.isInteger(entry.result) ? entry.result : parseFloat(entry.result).toFixed(2)}
                </div>
                {entry.forced && (
                  <div className="text-[#666] text-xs mt-1">(forced)</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clear Button - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-18 pt-4 bg-gradient-to-t from-black via-black to-transparent">
        <button
          onClick={onClear}
          className="bg-transparent border border-white/80 text-white font-normal text-base py-2.5 px-12 rounded-lg transition-all hover:bg-white/5 active:bg-white/10"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default HistoryPanel;