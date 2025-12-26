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

  const hasAge = (entry) => !!(entry.age || isAgeCalculation(entry));

  // Helper to check if entry has pincode (with or without address)
  const hasPincode = (entry) => entry.pincode;

  // Helper to check if entry has pincode address
  const hasPincodeAddress = (entry) =>
    entry.pincode && (entry.addressTaluk || entry.addressDistrict || entry.addressState);

  // Get the LAST pincode entry with address (for showing address at top)
  const lastPincodeWithAddress = history.find(entry => hasPincodeAddress(entry));

  // Get only the LAST age calculation entry
  const lastAgeEntry = history.find(entry => hasAge(entry));

  // Get ALL calculation entries (including pincode ones) - exclude only PURE age calculations
  const allCalculationEntries = history.filter(entry => entry.operationType !== 'age_calculation');

  // Render age calculation - simple text
  const renderAge = (entry) => {
    let age = entry.age;

    if (!age && entry.expression) {
      age = entry.result || entry.actualResult;
    }

    return (
      <div className="text-center py-1">
        <span className="text-white text-2xl font-bold">
          Age : {age}
        </span>
      </div>
    );
  };

  // Render address only (shown at top) - UPPERCASE, each part on new line
  const renderAddress = (entry) => {
    return (
      <div className="text-center py-1 space-y-0">
        {entry.addressTaluk && (
          <div className="text-white text-xl font-bold uppercase">{entry.addressTaluk}</div>
        )}
        {entry.addressDistrict && (
          <div className="text-white text-xl font-bold uppercase">{entry.addressDistrict}</div>
        )}
        {entry.addressState && (
          <div className="text-white text-xl font-bold uppercase">{entry.addressState}</div>
        )}
      </div>
    );
  };

  // Render regular calculation - show all operands
  const renderRegularEntry = (entry, idx) => {
    const operands = getOperands(entry);
    return (
      <div key={`regular-${idx}`} className="text-center space-y-1 py-2">
        {operands.map((operand, i) => (
          <div key={i} className="text-white text-4xl font-medium tracking-tight">
            {operand}
          </div>
        ))}
        {entry.age && (
          <div className="text-amber-500 text-xl font-bold mt-2">
            Age : {entry.age}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">

      {/* Scrollable Content */}
      <div className="px-6 pb-24 pt-1">
        {/* Logo - scrolls with content */}
        <div className="flex justify-center mb-1">
          <Image
            src="/sandeep.png"
            alt="Sandeep Fradian"
            width={200}
            height={50}
            className="w-48 h-auto"
          />
        </div>

        {history.length === 0 ? (
          <div className="text-center py-10 text-[#666] text-base">No history yet</div>
        ) : (
          <div className="space-y-3">
            {/* Last Pincode Address at the top */}
            {lastPincodeWithAddress && renderAddress(lastPincodeWithAddress)}

            {/* Last Age after address */}
            {lastAgeEntry && renderAge(lastAgeEntry)}

            {/* Separator if there are calculation entries */}
            {(lastPincodeWithAddress || lastAgeEntry) && allCalculationEntries.length > 0 && (
              <div className="flex items-center gap-4 py-4">
                <div className="flex-1 border-t border-gray-700"></div>
                <span className="text-gray-500 text-xs uppercase tracking-widest">Calculations</span>
                <div className="flex-1 border-t border-gray-700"></div>
              </div>
            )}

            {/* ALL calculation entries including pincode ones */}
            {allCalculationEntries.map((entry, idx) => renderRegularEntry(entry, idx))}
          </div>
        )}
      </div>

      {/* Clear Button - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-8 pt-4 bg-gradient-to-t from-black via-black to-transparent">
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
        className="absolute top-10 right-6 text-white hover:text-gray-300 transition-colors z-50 p-2"
        aria-label="Close"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default HistoryPanel;
