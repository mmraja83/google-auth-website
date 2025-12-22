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

        try {
            const token = localStorage.getItem('token');
            const res = await axios.put('http://localhost:8000/users/me', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            // Ideally update user in context here if needed, but page refresh works for boilerplate
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page">
            <div className="soft-card profile-card">
                <div className="profile-header">
                    <div className="profile-avatar-large">
                        {user?.picture ? (
                            <img src={user.picture} alt="Profile" />
                        ) : (
                            <span>{user?.name?.[0] || user?.email?.[0] || 'U'}</span>
                        )}
                    </div>
                    <h3>{user?.email}</h3>
                    <p className="gentle-subtitle">Manage your personal information</p>
                </div>

                <form onSubmit={handleSubmit} className="comfort-form profile-form">
                    {message.text && (
                        <div className={`message-banner ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="form-grid">
                        <div className="soft-field">
                            <div className="field-container">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder=" "
                                />
                                <label htmlFor="name">Full Name</label>
                                <div className="field-accent"></div>
                            </div>
                        </div>

                        <div className="soft-field">
                            <div className="field-container">
                                <input
                                    type="tel"
                                    id="phone_number"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    placeholder=" "
                                />
                                <label htmlFor="phone_number">Phone Number</label>
                                <div className="field-accent"></div>
                            </div>
                        </div>

                        <div className="soft-field full-width">
                            <div className="field-container">
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder=" "
                                />
                                <label htmlFor="address">Address</label>
                                <div className="field-accent"></div>
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <button type="submit" className={`comfort-button small ${loading ? 'loading' : ''}`} disabled={loading} style={{ width: 'auto', padding: '0 32px', display: 'inline-flex' }}>
                            <div className="button-background"></div>
                            <span className="button-text">Save Changes</span>
                            <div className="button-loader" style={{ opacity: loading ? 1 : 0 }}>
                                <div className="gentle-spinner">
                                    <div className="spinner-circle"></div>
                                </div>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
