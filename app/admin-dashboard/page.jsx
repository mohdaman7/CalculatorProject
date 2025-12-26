"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verificationService } from '@/lib/verification-service';
import { Trash2, Plus, Phone, Users, Shield, ArrowLeft, Loader2, Search, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
    const [whitelistedPhones, setWhitelistedPhones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [newPhone, setNewPhone] = useState('');
    const [description, setDescription] = useState('');
    const [isAdminRequested, setIsAdminRequested] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchWhitelist();
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const token = localStorage.getItem('calculator_token');
            if (token) {
                const data = await verificationService.getCurrentUser(token);
                if (data.success) {
                    setCurrentUser(data.user);
                }
            }
        } catch (err) {
            console.error('Error fetching current user:', err);
        }
    };

    const fetchWhitelist = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('calculator_token');
            if (!token) {
                router.push('/');
                return;
            }
            const data = await verificationService.getWhitelistedPhones(token);
            if (data.success) {
                setWhitelistedPhones(data.phones);
            } else {
                setError(data.error || 'Failed to fetch whitelist');
            }
        } catch (err) {
            setError('An error occurred while fetching the whitelist');
        } finally {
            setLoading(false);
        }
    };

    const handleAddPhone = async (e) => {
        e.preventDefault();
        if (!newPhone) return;

        setIsAdding(true);
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem('calculator_token');
            const data = await verificationService.addPhoneToWhitelist(newPhone, token, description, isAdminRequested);

            if (data.success) {
                setSuccess('Phone number added successfully');
                setNewPhone('');
                setDescription('');
                setIsAdminRequested(false);
                fetchWhitelist();
            } else {
                setError(data.error || 'Failed to add phone number');
            }
        } catch (err) {
            setError('An error occurred while adding the phone number');
        } finally {
            setIsAdding(false);
        }
    };

    const handleToggleAdmin = async (phone, currentStatus) => {
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem('calculator_token');
            const data = await verificationService.toggleAdminStatus(phone, token, !currentStatus);

            if (data.success) {
                setSuccess(`Admin status updated for \${phone}`);
                fetchWhitelist();
            } else {
                setError(data.error || 'Failed to update admin status');
            }
        } catch (err) {
            setError('An error occurred while updating admin status');
        }
    };

    const handleDeletePhone = async (phone) => {
        if (!confirm(`Are you sure you want to remove ${phone} from the whitelist?`)) return;

        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem('calculator_token');
            const data = await verificationService.removePhoneFromWhitelist(phone, token);

            if (data.success) {
                setSuccess('Phone number removed successfully');
                fetchWhitelist();
            } else {
                setError(data.error || 'Failed to remove phone number');
            }
        } catch (err) {
            setError('An error occurred while removing the phone number');
        }
    };

    const filteredPhones = whitelistedPhones.filter(item =>
        item.phoneNumber.includes(searchTerm) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500/30">
            <div className="max-w-6xl mx-auto p-4 md:p-8">

                {/* Header */}
                <div className="flex flex-col gap-6 mb-12">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push('/')}
                                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all group shrink-0"
                            >
                                <ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                            </button>
                            <div className="overflow-hidden">
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">Admin Dashboard</h1>
                                <p className="text-zinc-500 text-sm mt-1 flex items-center gap-2 truncate">
                                    <Shield className="w-4 h-4 text-amber-500 shrink-0" />
                                    Manage accessible phone numbers & admins
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl w-full sm:w-80">
                            <Search className="w-5 h-5 text-zinc-500 ml-3 shrink-0" />
                            <input
                                type="text"
                                placeholder="Search numbers or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 text-white placeholder-zinc-500 py-2 w-full text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Add Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-sm sticky top-8">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                                <Plus className="w-5 h-5 text-amber-500" />
                                Add New Number
                            </h2>

                            <form onSubmit={handleAddPhone} className="space-y-5">
                                <div>
                                    <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <input
                                            type="tel"
                                            placeholder="10-digit number"
                                            value={newPhone}
                                            onChange={(e) => setNewPhone(e.target.value)}
                                            className="w-full bg-black border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-amber-500 transition-all text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">
                                        Description / Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Optional details"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-500 transition-all text-sm"
                                    />
                                </div>

                                {currentUser?.isSuperAdmin && (
                                    <div className="flex items-center justify-between p-4 bg-zinc-950/50 border border-zinc-800 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Shield className="w-4 h-4 text-amber-500" />
                                            <span className="text-sm font-medium">Grant Admin Access</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsAdminRequested(!isAdminRequested)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isAdminRequested ? 'bg-amber-500' : 'bg-zinc-700'}`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAdminRequested ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                    </div>
                                )}

                                {error && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-xs flex items-center gap-3">
                                        <CheckCircle2 className="w-4 h-4" />
                                        {success}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isAdding || !newPhone}
                                    className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                                >
                                    {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                                    Add to Whitelist
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* List Table */}
                    <div className="lg:col-span-2">
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-sm">
                            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                                <h2 className="text-xl font-semibold flex items-center gap-3">
                                    <Users className="w-5 h-5 text-amber-500" />
                                    Whitelisted Access
                                </h2>
                                <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-[10px] md:text-xs font-medium uppercase tracking-wider">
                                    {filteredPhones.length} Total
                                </span>
                            </div>

                            <div className="overflow-x-auto hidden md:block">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-zinc-900 text-zinc-500 text-xs uppercase tracking-wider">
                                            <th className="px-6 py-4 font-medium">Phone Number</th>
                                            <th className="px-6 py-4 font-medium">Role</th>
                                            <th className="px-6 py-4 font-medium">Description</th>
                                            <th className="px-6 py-4 font-medium">Added On</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-800/50">
                                        {loading ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-20 text-center">
                                                    <Loader2 className="w-10 h-10 animate-spin text-amber-500 mx-auto mb-4" />
                                                    <p className="text-zinc-500 text-sm">Loading whitelisted numbers...</p>
                                                </td>
                                            </tr>
                                        ) : filteredPhones.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-20 text-center">
                                                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <Phone className="w-8 h-8 text-zinc-600" />
                                                    </div>
                                                    <p className="text-zinc-500 text-sm">No phone numbers found</p>
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredPhones.map((item) => (
                                                <tr key={item._id} className="hover:bg-zinc-800/30 transition-colors group">
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                                                                <Phone className="w-4 h-4 text-amber-500" />
                                                            </div>
                                                            <span className="font-mono text-lg">{item.phoneNumber}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <button
                                                            onClick={() => currentUser?.isSuperAdmin && handleToggleAdmin(item.phoneNumber, item.isAdminRequested)}
                                                            disabled={!currentUser?.isSuperAdmin}
                                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${item.isAdminRequested
                                                                ? 'bg-amber-500/20 text-amber-500 border border-amber-500/20'
                                                                : 'bg-zinc-800 text-zinc-500 border border-zinc-700/50 hover:border-zinc-500'
                                                                } ${!currentUser?.isSuperAdmin ? 'cursor-default opacity-80' : 'cursor-pointer'}`}
                                                        >
                                                            <Shield className={`w-3 h-3 ${item.isAdminRequested ? 'fill-amber-500' : ''}`} />
                                                            {item.isAdminRequested ? 'ADMIN' : 'USER'}
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <span className="text-zinc-400 text-sm font-medium">{item.description || '—'}</span>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <span className="text-zinc-500 text-xs">
                                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <button
                                                            onClick={() => handleDeletePhone(item.phoneNumber)}
                                                            className="p-2.5 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card List */}
                            <div className="md:hidden divide-y divide-zinc-800/50">
                                {loading ? (
                                    <div className="p-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-4" />
                                        <p className="text-zinc-500 text-sm font-medium">Loading...</p>
                                    </div>
                                ) : filteredPhones.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <Phone className="w-8 h-8 text-zinc-800 mx-auto mb-4" />
                                        <p className="text-zinc-500 text-sm">No results found</p>
                                    </div>
                                ) : (
                                    filteredPhones.map((item) => (
                                        <div key={item._id} className="p-5 flex flex-col gap-4 active:bg-zinc-900/50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                                                        <Phone className="w-4 h-4 text-amber-500" />
                                                    </div>
                                                    <span className="font-mono text-lg font-semibold tracking-tight">{item.phoneNumber}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleDeletePhone(item.phoneNumber)}
                                                    className="p-2 text-zinc-600 hover:text-red-500 active:bg-red-500/10 rounded-lg"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex flex-col gap-3 ml-11">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => currentUser?.isSuperAdmin && handleToggleAdmin(item.phoneNumber, item.isAdminRequested)}
                                                        disabled={!currentUser?.isSuperAdmin}
                                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${item.isAdminRequested
                                                            ? 'bg-amber-500/20 text-amber-500 border border-amber-500/20'
                                                            : 'bg-zinc-800 text-zinc-500 border border-zinc-700/50'
                                                            }`}
                                                    >
                                                        <Shield className={`w-3 h-3 ${item.isAdminRequested ? 'fill-amber-500' : ''}`} />
                                                        {item.isAdminRequested ? 'ADMIN' : 'USER'}
                                                    </button>
                                                    <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                                                        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </span>
                                                </div>
                                                {item.description && (
                                                    <p className="text-zinc-400 text-xs font-medium leading-relaxed italic pr-4">
                                                        "{item.description}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
        </div>
    );
}
