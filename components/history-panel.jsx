import React from 'react';
import Image from 'next/image';

const HistoryPanel = ({ history, onClose, onClear }) => {
  // Parse expression to get operands
  const parseExpression = (expression) => {
    // Expression format: "10 + 20" or "10 - 5" etc
    const parts = expression.split(/\s+/);
    return {
      firstOperand: parts[0],
      operator: parts[1],
      secondOperand: parts[2]
    };
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
      
      {/* Header with Logo */}
      <div className="flex flex-col items-center pt-3 pb-6 px-6 flex-shrink-0">
        <Image 
          src="/sandeep.png" 
          alt="Sandeep Fradian" 
          width={400}
          height={100}
          className="w-64 h-auto"
        />
      </div>

      {/* History List - Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        {history.length === 0 ? (
          <div className="text-center py-20 text-[#666] text-base">No history yet</div>
        ) : (
          <div className="space-y-8 pt-2">
            {history.map((entry, idx) => {
              const { firstOperand, operator, secondOperand } = parseExpression(entry.expression);
              return (
                <div key={idx} className="text-center">
                  {/* First Operand */}
                  <div className="text-white text-5xl font-light tracking-tight mb-4">
                    {firstOperand}
                  </div>
                  
                  {/* Second Operand */}
                  <div className="text-white text-5xl font-light tracking-tight">
                    {secondOperand}
                  </div>
                </div>
              );
            })}
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

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10"
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default HistoryPanel;
