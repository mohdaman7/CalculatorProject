"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { verificationService } from '@/lib/verification-service';

const AdminDashboard = ({ onClose, token, user }) => {
  const [phones, setPhones] = useState([]);
  const [newPhone, setNewPhone] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPhones, setLoadingPhones] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Load whitelisted phones
  useEffect(() => {
    loadPhones();
  }, []);

  const loadPhones = async () => {
    try {
      setLoadingPhones(true);
      const result = await verificationService.getWhitelistedPhones(token);
      if (result.success) {
        setPhones(result.phones || []);
      }
    } catch (err) {
      console.error('Error loading phones:', err);
      setError('Failed to load phones');
    } finally {
      setLoadingPhones(false);
    }
  };

  const handleAddPhone = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!newPhone.trim()) {
        setError('Please enter a phone number');
        setLoading(false);
        return;
      }

      const result = await verificationService.addPhoneToWhitelist(
        newPhone,
        token,
        description
      );

      if (result.success) {
        setSuccess(`✓ Added: ${newPhone}`);
        setNewPhone('');
        setDescription('');
        loadPhones(); // Reload list
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message || 'Failed to add phone');
      }
    } catch (err) {
      setError('Error adding phone: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhone = async (phoneNumber) => {
    setError('');
    setLoading(true);

    try {
      const result = await verificationService.removePhoneFromWhitelist(
        phoneNumber,
        token
      );

      if (result.success) {
        setSuccess(`✓ Removed: ${phoneNumber}`);
        setDeleteConfirm(null);
        loadPhones(); // Reload list
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message || 'Failed to delete phone');
      }
    } catch (err) {
      setError('Error deleting phone: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const maskPhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return digits.slice(0, -4).replace(/\d/g, '*') + digits.slice(-4);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl bg-[#1c1c1c] rounded-3xl p-8 border border-[#333] max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-light text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Manage whitelisted phone numbers</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="bg-[#333] rounded-lg p-4 mb-6">
          <p className="text-gray-400 text-sm">
            Logged in as: <span className="text-[#FF9F0A] font-medium">{user?.phoneNumber || 'Admin'}</span>
          </p>
        </div>

        {/* Add New Phone Form */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-light text-white mb-4">Add New Phone Number</h2>
          <form onSubmit={handleAddPhone} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => {
                  setNewPhone(e.target.value);
                  setError('');
                }}
                placeholder="(555) 123-4567"
                className="col-span-1 md:col-span-2 bg-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9F0A]"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !newPhone.trim()}
                className="bg-[#FF9F0A] text-black py-3 rounded-lg font-medium hover:bg-[#FFB340] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Phone'
                )}
              </button>
            </div>

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (e.g., John Doe - Manager)"
              className="w-full bg-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9F0A]"
              disabled={loading}
            />

            {error && (
              <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-900/20 border border-green-500/30 text-green-400 text-sm p-3 rounded-lg">
                {success}
              </div>
            )}
          </form>
        </div>

        {/* Phone List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-light text-white">
              Whitelisted Numbers ({phones.length})
            </h2>
            <button
              onClick={loadPhones}
              disabled={loadingPhones}
              className="text-[#FF9F0A] hover:text-[#FFB340] text-sm disabled:opacity-50"
            >
              Refresh
            </button>
          </div>

          {loadingPhones ? (
            <div className="text-center py-8">
              <div className="w-6 h-6 border-2 border-[#FF9F0A] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-400 text-sm">Loading phones...</p>
            </div>
          ) : phones.length === 0 ? (
            <div className="bg-[#2a2a2a] rounded-lg p-8 text-center">
              <p className="text-gray-400">No whitelisted phones yet.</p>
              <p className="text-gray-500 text-sm mt-2">Add your first phone number above.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {phones.map((phone) => (
                <div
                  key={phone._id}
                  className="bg-[#2a2a2a] rounded-lg p-4 flex justify-between items-start hover:bg-[#333] transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium">
                        {maskPhone(phone.phoneNumber)}
                      </span>
                      {phone.isActive ? (
                        <span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">
                          Active
                        </span>
                      ) : (
                        <span className="bg-gray-900/30 text-gray-400 text-xs px-2 py-1 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    {phone.description && (
                      <p className="text-gray-400 text-sm">{phone.description}</p>
                    )}
                    <div className="text-gray-500 text-xs mt-2 space-y-1">
                      <p>Added: {formatDate(phone.addedAt)}</p>
                      {phone.lastUsedAt && (
                        <p>Last used: {formatDate(phone.lastUsedAt)}</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      deleteConfirm === phone._id
                        ? handleDeletePhone(phone.phoneNumber)
                        : setDeleteConfirm(phone._id)
                    }
                    disabled={loading}
                    className={`ml-4 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      deleteConfirm === phone._id
                        ? 'bg-red-900/40 text-red-400 hover:bg-red-900/60'
                        : 'text-gray-400 hover:text-red-400'
                    } disabled:opacity-50`}
                  >
                    {deleteConfirm === phone._id ? 'Confirm?' : 'Delete'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#333]">
          <button
            onClick={onClose}
            className="w-full bg-transparent border border-gray-600 text-gray-400 py-3 rounded-lg hover:border-gray-400 hover:text-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
