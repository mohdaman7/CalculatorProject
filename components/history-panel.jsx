import React from 'react';
import Image from 'next/image';

const HistoryPanel = ({ history, onClose, onClear }) => {
  // Get all operands from entry
  const getOperands = (entry) => {
    // If operands array exists, use it
    if (entry.operands && Array.isArray(entry.operands)) {
      return entry.operands;
    }
    // Fallback: parse expression for older entries
    const parts = entry.expression?.split(/\s+/) || [];
    return parts.filter((_, i) => i % 2 === 0); // Get only operands (skip operators)
  };

  // Helper to check if entry is age calculation
  const isAgeCalculation = (entry) => 
    entry.operationType === 'age_calculation' || 
    (entry.expression && (entry.expression.startsWith('Year:') || entry.expression.startsWith('Age from')));
  
  // Helper to check if entry has pincode address
  const hasPincodeAddress = (entry) => 
    entry.pincode && (entry.addressTaluk || entry.addressDistrict || entry.addressState);

  // Get only the LAST pincode entry with address
  const lastPincodeEntry = history.find(entry => hasPincodeAddress(entry));
  
  // Get only the LAST age calculation entry
  const lastAgeEntry = history.find(entry => isAgeCalculation(entry));
  
  const regularEntries = history.filter(entry => 
    !isAgeCalculation(entry) && !hasPincodeAddress(entry)
  );

  // Render age calculation - simple text
  const renderAge = (entry) => {
    let age = entry.age;
    
    if (!age && entry.expression) {
      age = entry.result || entry.actualResult;
    }
    
    return (
      <div className="text-center py-2">
        <span className="text-orange-400 text-2xl font-bold">
          Age : {age}
        </span>
      </div>
    );
  };

  // Render pincode address - simple text
  const renderAddress = (entry) => {
    const addressParts = [entry.addressTaluk, entry.addressDistrict, entry.addressState].filter(Boolean);
    
    return (
      <div className="text-center py-2">
        <div className="text-emerald-400 text-xl font-bold">
          {addressParts.join(', ')}
        </div>
      </div>
    );
  };

  // Render regular calculation - show all operands
  const renderRegularEntry = (entry, idx) => {
    const operands = getOperands(entry);
    return (
      <div key={`regular-${idx}`} className="text-center space-y-2">
        {operands.map((operand, i) => (
          <div key={i} className="text-white text-4xl font-medium tracking-tight">
            {operand}
          </div>
        ))}
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
          <div className="space-y-6 pt-2">
            {/* Last Pincode Address at the top */}
            {lastPincodeEntry && renderAddress(lastPincodeEntry)}
            
            {/* Last Age after address */}
            {lastAgeEntry && renderAge(lastAgeEntry)}
            
            {/* Separator if there are regular entries */}
            {(lastPincodeEntry || lastAgeEntry) && regularEntries.length > 0 && (
              <div className="flex items-center gap-4 py-4">
                <div className="flex-1 border-t border-gray-700"></div>
                <span className="text-gray-500 text-xs uppercase tracking-widest">Calculations</span>
                <div className="flex-1 border-t border-gray-700"></div>
              </div>
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
