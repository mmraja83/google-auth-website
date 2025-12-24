import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone_number: user.phone_number || '',
                address: user.address || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        if (!formData.name.trim()) {
            setMessage({ type: 'error', text: 'Full Name is required' });
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            // Assuming this endpoint exists and handles the update
            const res = await axios.put('http://localhost:8000/users/me', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                {/* Profile Header */}
                <div className="p-8 border-b border-border-light dark:border-border-dark flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center font-bold text-3xl mb-4 shadow-lg shadow-primary/20">
                        {user?.picture ? (
                            <img src={user.picture} alt="Profile" className="h-full w-full rounded-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                            user?.name?.[0] || 'U'
                        )}
                    </div>
                    <h2 className="text-xl font-bold text-text-main dark:text-white">{user?.name}</h2>
                    <p className="text-sm text-text-secondary dark:text-gray-400">{user?.email}</p>
                </div>

                {/* Profile Form */}
                <div className="p-8">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-text-main dark:text-white mb-1">Personal Information</h3>
                        <p className="text-sm text-text-secondary dark:text-gray-400">Update your account details here.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {message.text && (
                            <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success'
                                ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-main dark:text-gray-200" htmlFor="name">Full Name</label>
                            <input
                                className="block w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-3.5 text-text-main dark:text-white placeholder-text-secondary/70 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Unknown"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-text-main dark:text-gray-200" htmlFor="phone_number">Phone Number</label>
                                <input
                                    className="block w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-3.5 text-text-main dark:text-white placeholder-text-secondary/70 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    id="phone_number"
                                    name="phone_number"
                                    type="tel"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-text-main dark:text-gray-200" htmlFor="address">Address</label>
                                <input
                                    className="block w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-3.5 text-text-main dark:text-white placeholder-text-secondary/70 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
