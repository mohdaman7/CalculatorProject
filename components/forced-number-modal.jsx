"use client"

import { useState } from "react"

// Force Number Modal
const ForceNumberModal = ({ currentValue, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    forcedNumber: currentValue?.forcedNumber ? String(currentValue.forcedNumber) : "",
    secondForceNumber: currentValue?.secondForceNumber ? String(currentValue.secondForceNumber) : "",
    secondForceTriggerNumber: currentValue?.secondForceTriggerNumber ? String(currentValue.secondForceTriggerNumber) : ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const data = {};
    if (formData.forcedNumber.trim()) data.forcedNumber = Number.parseFloat(formData.forcedNumber);
    else data.forcedNumber = null;
    
    if (formData.secondForceNumber.trim()) data.secondForceNumber = Number.parseFloat(formData.secondForceNumber);
    else data.secondForceNumber = null;
    
    if (formData.secondForceTriggerNumber.trim()) data.secondForceTriggerNumber = Number.parseFloat(formData.secondForceTriggerNumber);
    else data.secondForceTriggerNumber = null;
    
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-[#1C1C1E] rounded-t-[20px] sm:rounded-[20px] w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header with Logo */}
        <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-[#38383A]">
          <div className="w-32 h-32 mb-4 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" fill="#2C2C2E" stroke="#48484A" strokeWidth="2"/>
                <text x="40" y="52" fontSize="32" fill="#D4D4D2" textAnchor="middle" fontWeight="300">AOM</text>
              </svg>
            </div>
          </div>
          <h2 className="text-white text-xl font-semibold">Sandeep Fradian</h2>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Forcing Number */}
          <div>
            <label className="block text-[#98989D] text-sm font-medium mb-2 uppercase tracking-wide">
              Forcing Number
            </label>
            <input
              type="number"
              value={formData.forcedNumber}
              onChange={(e) => handleInputChange('forcedNumber', e.target.value)}
              placeholder="100"
              className="w-full bg-[#2C2C2E] text-white text-lg px-4 py-4 rounded-xl border border-[#38383A] focus:outline-none focus:border-[#FF9F0A] placeholder-[#48484A]"
            />
          </div>

          {/* Second Force Number */}
          <div>
            <label className="block text-[#98989D] text-sm font-medium mb-2 uppercase tracking-wide">
              Second Force Number
            </label>
            <input
              type="number"
              value={formData.secondForceNumber}
              onChange={(e) => handleInputChange('secondForceNumber', e.target.value)}
              placeholder="200"
              className="w-full bg-[#2C2C2E] text-white text-lg px-4 py-4 rounded-xl border border-[#38383A] focus:outline-none focus:border-[#FF9F0A] placeholder-[#48484A]"
            />
          </div>

          {/* Second Force Trigger Number */}
          <div>
            <label className="block text-[#98989D] text-sm font-medium mb-2 uppercase tracking-wide">
              Second Force Trigger Number
            </label>
            <input
              type="number"
              value={formData.secondForceTriggerNumber}
              onChange={(e) => handleInputChange('secondForceTriggerNumber', e.target.value)}
              placeholder="Enter trigger number"
              className="w-full bg-[#2C2C2E] text-white text-lg px-4 py-4 rounded-xl border border-[#38383A] focus:outline-none focus:border-[#FF9F0A] placeholder-[#48484A]"
            />
          </div>

          {/* Save Button */}
          <button 
            onClick={handleSave}
            className="w-full bg-[#FF9F0A] hover:bg-[#FFB340] text-white font-semibold py-4 rounded-xl transition-colors"
          >
            SAVE
          </button>
        </div>

        {/* Footer Logo */}
        <div className="flex justify-center pb-8 pt-4">
          <div className="text-[#98989D] text-xs">
            <div className="font-serif text-2xl tracking-wider">ART OF MENTALISM</div>
            <div className="text-center text-[10px] mt-1">BY SANDEEP FRADIAN</div>
          </div>
        </div>

        <div className="text-center pb-4 text-[#98989D] text-xs">
          AOM FORCE V1<br/>
          2025 COPYRIGHT TO SANDEEP FRADIAN
        </div>
      </div>
    </div>
  );
};

export default ForceNumberModal;