import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const DesignForm = () => {
    const { login, register, handleGoogleCredentialResponse } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('Email and password are required');
            setLoading(false);
            return;
        }

        if (isLogin) {
            const res = await login(email, password);
            if (!res.success) {
                setError(res.error);
            } else {
                setSuccess('Welcome back!');
            }
        } else {
            // Register
            const res = await register(email, password, ''); // Name blank for now
            if (!res.success) {
                setError(res.error);
            } else {
                setSuccess('Account created! Logging you in...');
                await login(email, password);
            }
        }
        setLoading(false);
    };

    return (
        <>
            <div className="soft-background">
                <div className="floating-shapes">
                    <div className="soft-blob blob-1"></div>
                    <div className="soft-blob blob-2"></div>
                    <div className="soft-blob blob-3"></div>
                    <div className="soft-blob blob-4"></div>
                </div>
            </div>

            <div className="login-container">
                <div className="soft-card">
                    <div className="comfort-header">
                        <div className="gentle-logo">
                            <div className="logo-circle">
                                <div className="comfort-icon">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M12 16a4 4 0 108 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                        <circle cx="20" cy="12" r="1.5" fill="currentColor" />
                                    </svg>
                                </div>
                                <div className="gentle-glow"></div>
                            </div>
                        </div>
                        <h1 className="comfort-title">{isLogin ? 'Welcome back' : 'Create Account'}</h1>
                        <p className="gentle-subtitle">{isLogin ? 'Sign in to your peaceful space' : 'Join our community'}</p>
                    </div>

                    {!success ? (
                        <form className="comfort-form" onSubmit={handleSubmit} noValidate>
                            <div className={`soft-field ${error ? 'error' : ''}`}>
                                <div className="field-container">
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        autoComplete="email"
                                        placeholder=" "
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="email">Email address</label>
                                    <div className="field-accent"></div>
                                </div>
                            </div>

                            <div className={`soft-field ${error ? 'error' : ''}`}>
                                <div className="field-container">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        id="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder=" "
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="password">Password</label>
                                    <button
                                        type="button"
                                        className={`gentle-toggle ${passwordVisible ? 'toggle-active' : ''}`}
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        aria-label="Toggle password visibility"
                                    >
                                        <div className="toggle-icon">
                                            {/* Closed Eye */}
                                            {!passwordVisible && (
                                                <svg className="eye-closed" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: 'block' }}>
                                                    <path d="M3 3l14 14M8.5 8.5a3 3 0 004 4m2.5-2.5C15 10 12.5 7 10 7c-.5 0-1 .1-1.5.3M10 13c-2.5 0-4.5-2-5-3 .3-.6.7-1.2 1.2-1.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                            {/* Open Eye */}
                                            {passwordVisible && (
                                                <svg className="eye-open" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: 'block' }}>
                                                    <path d="M10 3c-4.5 0-8.3 3.8-9 7 .7 3.2 4.5 7 9 7s8.3-3.8 9-7c-.7-3.2-4.5-7-9-7z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                    <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                </svg>
                                            )}
                                        </div>
                                    </button>
                                    <div className="field-accent"></div>
                                </div>
                                {error && <span className="gentle-error show" style={{ display: 'block' }}>{error}</span>}
                            </div>

                            {isLogin && (
                                <div className="comfort-options">
                                    <label className="gentle-checkbox">
                                        <input type="checkbox" name="remember" />
                                        <span className="checkbox-soft">
                                            <div className="check-circle"></div>
                                            <svg className="check-mark" width="12" height="10" viewBox="0 0 12 10" fill="none">
                                                <path d="M1 5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="checkbox-text">Remember me</span>
                                    </label>
                                    <a href="#" className="comfort-link">Forgot password?</a>
                                </div>
                            )}

                            <button type="submit" className={`comfort-button ${loading ? 'loading' : ''}`} disabled={loading}>
                                <div className="button-background"></div>
                                <span className="button-text">{isLogin ? 'Sign in' : 'Create account'}</span>
                                <div className="button-loader" style={{ opacity: loading ? 1 : 0 }}>
                                    <div className="gentle-spinner">
                                        <div className="spinner-circle"></div>
                                    </div>
                                </div>
                                <div className="button-glow"></div>
                            </button>
                        </form>
                    ) : (
                        <div className="gentle-success show">
                            <div className="success-bloom">
                                <div className="bloom-rings">
                                    <div className="bloom-ring ring-1"></div>
                                    <div className="bloom-ring ring-2"></div>
                                    <div className="bloom-ring ring-3"></div>
                                </div>
                                <div className="success-icon" style={{ opacity: 1, transform: 'scale(1)' }}>
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                        <path d="M8 14l5 5 11-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="success-title">Welcome!</h3>
                            <p className="success-desc">Taking you to your dashboard...</p>
                        </div>
                    )}

                    {!success && (
                        <>
                            <div className="gentle-divider">
                                <div className="divider-line"></div>
                                <span className="divider-text">or continue with</span>
                                <div className="divider-line"></div>
                            </div>

                            <div className="comfort-social" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: '100%' }}>
                                    <GoogleLogin
                                        onSuccess={async (credentialResponse) => {
                                            const res = await handleGoogleCredentialResponse(credentialResponse.credential);
                                            if (res.success) {
                                                setSuccess("Logged in with Google!");
                                            } else {
                                                setError(res.error);
                                            }
                                        }}
                                        onError={() => {
                                            setError('Google Login Failed');
                                        }}
                                        useOneTap
                                        shape="pill"
                                        logo_alignment="left"
                                        text={isLogin ? "signin_with" : "signup_with"}
                                    />
                                </div>
                            </div>

                            <div className="comfort-signup">
                                <span className="signup-text">{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
                                <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="comfort-link signup-link" style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', cursor: 'pointer' }}>
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default DesignForm;
