"use client"

import { useState } from 'react';

const BirthYearModal = ({ isOpen, onClose, onSubmit, initialYear = null, isLoading = false }) => {
  const [year, setYear] = useState(initialYear?.toString() || '');
  const [error, setError] = useState('');

  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate input
    if (!year) {
      setError('Please enter a birth year');
      return;
    }

    const birthYear = parseInt(year, 10);

    if (isNaN(birthYear)) {
      setError('Please enter a valid year');
      return;
    }

    if (birthYear < 1900 || birthYear > currentYear) {
      setError(`Birth year must be between 1900 and ${currentYear}`);
      return;
    }

    const age = currentYear - birthYear;
    if (age > 150) {
      setError('Please enter a valid birth year');
      return;
    }

    onSubmit(birthYear);
    setYear('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#1c1c1c] rounded-2xl p-8 max-w-sm w-full mx-4 border border-[#333]">
        <h2 className="text-white text-2xl font-light mb-6 text-center">Enter Birth Year</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="number"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setError('');
              }}
              placeholder="e.g., 1998"
              min="1900"
              max={currentYear}
              className="w-full bg-[#333] text-white px-4 py-3 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-[#FF9F0A] placeholder-gray-500"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          {year && !error && (
            <div className="text-gray-400 text-sm text-center">
              Age: {currentYear - parseInt(year, 10)} years
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-transparent border border-white/30 text-white py-3 rounded-lg font-medium hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#FF9F0A] text-black py-3 rounded-lg font-medium hover:bg-[#FFB340] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                'Calculate Age'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BirthYearModal;
