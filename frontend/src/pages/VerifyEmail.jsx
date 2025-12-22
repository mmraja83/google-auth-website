import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your email...');

    const verificationAttempted = React.useRef(false);

    useEffect(() => {
        const verify = async () => {
            if (!token) {
                setStatus('error');
                setMessage('Invalid verification link.');
                return;
            }

            // Prevent double execution in React Strict Mode
            if (verificationAttempted.current) return;
            verificationAttempted.current = true;

            try {
                // Call backend verification endpoint
                await axios.post(`http://localhost:8000/verify-email/${token}`);
                setStatus('success');
                setMessage('Email verified successfully!');
            } catch (err) {
                // If the error is "Invalid verification token", it's possible the user is already verified.
                // We could enhance the backend to handle this or just show the error.
                setStatus('error');
                setMessage(err.response?.data?.detail || 'Verification failed. Link may be invalid or expired.');
            }
        };

        verify();
    }, [token]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background blobs reusing from DesignForm */}
            <div className="soft-background">
                <div className="floating-shapes">
                    <div className="soft-blob blob-1"></div>
                    <div className="soft-blob blob-2"></div>
                </div>
            </div>

            <div className="soft-card" style={{
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center',
                zIndex: 1,
                padding: '40px'
            }}>
                <div className="comfort-header" style={{ marginBottom: '20px' }}>
                    <div className="gentle-logo" style={{ margin: '0 auto 20px' }}>
                        <div className="logo-circle">
                            <div className="comfort-icon">
                                {status === 'verifying' && (
                                    <div className="gentle-spinner" style={{ position: 'relative', width: '24px', height: '24px' }}>
                                        <div className="spinner-circle" style={{ borderTopColor: 'var(--text-primary)' }}></div>
                                    </div>
                                )}
                                {status === 'success' && (
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                )}
                                {status === 'error' && (
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                )}
                            </div>
                            <div className="gentle-glow"></div>
                        </div>
                    </div>

                    <h2 className="comfort-title" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
                        {status === 'verifying' && 'Verifying...'}
                        {status === 'success' && 'Verified!'}
                        {status === 'error' && 'Verification Failed'}
                    </h2>

                    <p className="gentle-subtitle" style={{ marginBottom: '30px' }}>
                        {message}
                    </p>

                    {status !== 'verifying' && (
                        <button
                            className="comfort-button"
                            onClick={() => navigate(status === 'success' ? '/dashboard' : '/login')}
                        >
                            <div className="button-background"></div>
                            <span className="button-text">
                                {status === 'success' ? 'Go to Dashboard' : 'Back to Login'}
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
