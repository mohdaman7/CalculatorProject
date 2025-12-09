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

  // Helper to check if entry is age calculation
  const isAgeCalculation = (entry) => 
    entry.operationType === 'age_calculation' || 
    (entry.expression && (entry.expression.startsWith('Year:') || entry.expression.startsWith('Age from')));
  
  // Helper to check if entry has pincode address
  const hasPincodeAddress = (entry) => 
    entry.pincode && (entry.addressTaluk || entry.addressDistrict || entry.addressState);

  // Separate special entries (age/pincode) from regular calculations
  const specialEntries = history.filter(entry => 
    isAgeCalculation(entry) || hasPincodeAddress(entry)
  );
  
  const regularEntries = history.filter(entry => 
    !isAgeCalculation(entry) && !hasPincodeAddress(entry)
  );

  // Render age calculation card
  const renderAgeCard = (entry, idx) => {
    // Extract year from expression if not available (format: "Year: 1990" or "Age from 1990")
    let year = entry.year;
    let age = entry.age;
    
    if (!year && entry.expression) {
      const match = entry.expression.match(/\d{4}/);
      if (match) {
        year = parseInt(match[0]);
        age = age || entry.result || entry.actualResult;
      }
    }
    
    return (
      <div key={`age-${idx}`} className="text-center">
        <div className="mx-auto max-w-sm bg-gradient-to-br from-orange-500/20 to-amber-600/10 border border-orange-500/40 rounded-xl p-6 shadow-lg shadow-orange-500/10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🎂</span>
            <span className="text-orange-400 text-lg font-bold uppercase tracking-widest">Age</span>
          </div>
          
          <div className="text-white text-6xl font-bold tracking-tight">
            {age}
          </div>
          
          <div className="border-t border-orange-500/30 my-4"></div>
          
          <div className="text-gray-400 text-sm">
            Born in <span className="text-white font-semibold">{year}</span>
          </div>
        </div>
      </div>
    );
  };

  // Render pincode address card
  const renderPincodeCard = (entry, idx) => {
    const { firstOperand, secondOperand } = parseExpression(entry.expression);
    return (
      <div key={`pincode-${idx}`} className="text-center">
        <div className="mx-auto max-w-sm bg-gradient-to-br from-emerald-500/20 to-teal-600/10 border border-emerald-500/40 rounded-xl p-6 shadow-lg shadow-emerald-500/10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl">📍</span>
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Location</span>
          </div>
          
          <div className="text-white text-4xl font-light tracking-tight mb-2">
            {entry.pincode}
          </div>
          
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-3">
            Pincode
          </div>
          
          <div className="border-t border-emerald-500/30 my-4"></div>
          
          <div className="text-emerald-400 text-xl font-medium">
            {entry.addressTaluk}
          </div>
          
          <div className="text-white text-lg mt-1">
            {entry.addressDistrict}
          </div>
          
          <div className="text-gray-300 text-base mt-1">
            {entry.addressState}
          </div>
          
          <div className="border-t border-emerald-500/30 my-4"></div>
          
          <div className="text-gray-500 text-sm">
            {firstOperand} → {secondOperand}
          </div>
        </div>
      </div>
    );
  };

  // Render regular calculation
  const renderRegularEntry = (entry, idx) => {
    const { firstOperand, secondOperand } = parseExpression(entry.expression);
    return (
      <div key={`regular-${idx}`} className="text-center">
        <div className="text-white text-5xl font-light tracking-tight mb-4">
          {firstOperand}
        </div>
        
        <div className="text-white text-5xl font-light tracking-tight">
          {secondOperand}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
      
      {/* Header with Logo */}
      <div className="flex flex-col items-center pt-3 pb-6 px-6 shrink-0">
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
            {/* Special entries (Age & Pincode) at the top with highlighting */}
            {specialEntries.length > 0 && (
              <>
                {specialEntries.map((entry, idx) => {
                  if (isAgeCalculation(entry)) {
                    return renderAgeCard(entry, idx);
                  }
                  if (hasPincodeAddress(entry)) {
                    return renderPincodeCard(entry, idx);
                  }
                  return null;
                })}
                
                {/* Separator if there are regular entries */}
                {regularEntries.length > 0 && (
                  <div className="flex items-center gap-4 py-4">
                    <div className="flex-1 border-t border-gray-700"></div>
                    <span className="text-gray-500 text-xs uppercase tracking-widest">Calculations</span>
                    <div className="flex-1 border-t border-gray-700"></div>
                  </div>
                )}
              </>
            )}
            
            {/* Regular calculation entries */}
            {regularEntries.map((entry, idx) => renderRegularEntry(entry, idx))}
          </div>
        )}
      </div>

      {/* Clear Button - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-18 pt-4 bg-linear-to-t from-black via-black to-transparent">
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
