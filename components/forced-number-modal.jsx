"use client"

import { useState } from "react"
import Image from "next/image"

const ForcedNumberModal = ({ currentValue, onSave, onClose }) => {
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
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#666" strokeWidth="0.5" opacity="0.3"/>
              <path d="M50 10 L90 90 M10 90 L90 10" stroke="#666" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-4">
        {/* Top Logo Section */}
        <div className="mb-2 text-center">
          <div className="mb-2">
            <Image
              src="/sandeep.png"
              alt="Sandeep Fradian"
              width={800}
              height={250}
              className="mx-auto h-56 w-auto"
              priority
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-sm space-y-5">
          {/* Forcing Number */}
          <div>
            <label className="block text-white text-sm font-semibold mb-3 uppercase tracking-widest text-center">
              Forcing Number
            </label>
            <input
              type="number"
              value={formData.forcedNumber}
              onChange={(e) => handleInputChange('forcedNumber', e.target.value)}
              placeholder="Enter forced value"
              className="w-full bg-transparent text-white text-lg px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-white transition-colors placeholder-gray-500"
            />
          </div>

          {/* Second Force Number */}
          <div>
            <label className="block text-white text-sm font-semibold mb-3 uppercase tracking-widest text-center">
              Second Force Number
            </label>
            <input
              type="number"
              value={formData.secondForceNumber}
              onChange={(e) => handleInputChange('secondForceNumber', e.target.value)}
              placeholder="Enter second force value"
              className="w-full bg-transparent text-white text-lg px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-white transition-colors placeholder-gray-500"
            />
          </div>

          {/* Second Force Trigger Number */}
          <div>
            <label className="block text-white text-sm font-semibold mb-3 uppercase tracking-widest text-center">
              Second Force Trigger Number
            </label>
            <input
              type="number"
              value={formData.secondForceTriggerNumber}
              onChange={(e) => handleInputChange('secondForceTriggerNumber', e.target.value)}
              placeholder="Enter trigger number"
              className="w-full bg-transparent text-white text-lg px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-white transition-colors placeholder-gray-500"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-2">
            <button 
              onClick={handleSave}
              className="px-12 py-3 border-2 border-white text-white font-semibold uppercase tracking-widest rounded-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              Save
            </button>
          </div>
        </div>

        {/* Bottom Logo Section */}
        <div className="mt-12 flex flex-col items-center space-y-6">
          {/* Art of Mentalism Logo */}
          <div className="relative w-56 h-56">
            <Image
              src="/logo.png"
              alt="Art of Mentalism"
              width={224}
              height={224}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Footer Text */}
          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
              AOM FORCE V1
            </p>
            <p className="text-gray-500 text-xs uppercase tracking-widest">
              2025 COPYRIGHT TO SANDEEP FRADIAN
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ForcedNumberModal;
